"use server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { revalidatePath } from "next/cache";
import { Feedback } from "@/payload-types";

export const submitFeedback = async (data: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>) => {
  const payload = await getPayload({
    config: await configPromise,
  });

  try {
    await payload.create({
      collection: "feedback",
      data: data,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error submitting feedback" };
  }
}; 