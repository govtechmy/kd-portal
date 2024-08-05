import configPromise from "@payload-config";
import groupBy from "lodash/groupBy";
import { getPayload } from "payload";

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
    // Count existing documents
    const [existingDept, existingStaff] = await Promise.all([
      payload.count({ collection: "kd-department" }),
      payload.count({ collection: "staff-directory" }),
    ]);

    // Delete documents if they exist
    if (existingDept.totalDocs > 0 || existingStaff.totalDocs > 0) {
      await Promise.all([
        payload.delete({
          collection: "kd-department",
          where: { _id: { exists: true } },
        }),
        payload.delete({
          collection: "staff-directory",
          where: { _id: { exists: true } },
        }),
      ]);
    }

    const staffList = await req.json();

    const collection = groupBy(staffList, (item) => item.id_bhg);

    const _kdDept = await Promise.all(
      Object.entries(collection).map(([key, value]) => {
        return payload.create({
          collection: "kd-department",
          data: {
            id_bhg: Number(key),
            bhg: value[0].bhg,
          },
        });
      }),
    );

    const createStaffDirectory = async () => {
      for (const staff of staffList) {
        const { bhg, id, id_bhg, ...rest } = staff;
        const selectDept = _kdDept.find((dept) => dept.id_bhg === id_bhg);

        if (selectDept) {
          await payload.create({
            collection: "staff-directory",
            data: {
              staff_id: id,
              id_bhg: selectDept.id,
              ...rest,
            },
          });
        }
      }
    };

    await createStaffDirectory();

    return Response.json({
      status: 200,
      message: "Successfully recreates the staff directory",
    });
  } catch (error) {
    Response.json(
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
