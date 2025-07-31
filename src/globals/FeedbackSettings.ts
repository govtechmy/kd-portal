import { GlobalConfig } from "payload";

export const FeedbackSettings: GlobalConfig = {
  slug: "feedback-settings",
  label: "Feedback Settings",
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "adminEmail",
      label: "Admin  For Feedback Response",
      type: "email",
      required: true,
      defaultValue: "ukk@digital.gov.my",
    },
  ],
};
