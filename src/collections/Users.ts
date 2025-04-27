import { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Kullanıcı",
    plural: "Kullanıcılar",
  },
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "username",
      label: "Kullanıcı Adı",
      required: true,
      unique: true,
      type: "text",
    },
  ],
};
