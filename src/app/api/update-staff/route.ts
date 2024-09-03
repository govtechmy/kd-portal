import configPromise from "@payload-config";
import groupBy from "lodash/groupBy";
import { getPayload } from "payload";
import { revalidateCollection } from "@/lib/hooks/revalidatePath";

/**
 * POST endpoint to bulk-update staff-directory collections
 * @param req Request (contains the JSON of the directory in the body)
 * @param res Response
 * @returns
 */
export const POST = async (req: Request) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const token = req.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
    return Response.json(
      {
        status: 401,
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const staffList = await req.json();
    if (!staffList.length) {
      return Response.json(
        {
          status: 422,
          message: "Missing data. Please provide the data",
        },
        {
          status: 422,
        },
      );
    }

    // Count existing documents
    const [existingDept, existingStaff] = await Promise.all([
      payload.count({ collection: "kd-department" }),
      payload.count({ collection: "staff-directory" }),
    ]);

    // Delete documents if they exist
    if (existingDept.totalDocs > 0 || existingStaff.totalDocs > 0) {
      await Promise.all([
        payload.db.collections["kd-department"].deleteMany(),
        // payload.delete({
        //   collection: "kd-department",
        //   where: { _id: { exists: true } },
        // }),
        payload.db.collections["staff-directory"].deleteMany(),
        payload.db.collections["search"].deleteMany({
          "doc.relationTo": "staff-directory",
        }),
        // payload.delete({
        //   collection: "staff-directory",
        //   where: { _id: { exists: true } },
        // }),
      ]);
    }

    const collection = groupBy(staffList, (item) => item.id_bhg);

    const departmentList = Object.entries(collection).map(([key, value]) => {
      return {
        id_bhg: Number(key),
        bhg: value[0].bhg,
      };
    });

    const deptResp =
      await payload.db.collections["kd-department"].insertMany(departmentList);

    const listToInsert = staffList.map((staff: any) => {
      const { bhg, id, id_bhg, ...rest } = staff;
      const selectDept = deptResp.find((dept) => dept.id_bhg === id_bhg);

      if (selectDept) {
        return {
          staff_id: id,
          id_bhg: selectDept.id,
          ...rest,
        };
      }
    });

    const inserted =
      await payload.db.collections["staff-directory"].insertMany(listToInsert);

    const searchList = inserted.map((i) => ({
      title: i.nama,
      priority: 30,
      doc: {
        relationTo: "staff-directory",
        value: i._id.toString(),
      },
    }));

    await payload.db.collections["search"].insertMany(searchList);

    // Lastly, revalidate the static page
    revalidateCollection("DIRECTORY");

    return Response.json({
      status: 200,
      message: "Successfully recreates the staff directory",
    });
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: "Something went wrong with the action",
      },
      {
        status: 500,
      },
    );
  }
};
