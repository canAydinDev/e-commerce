import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Kategori",
    plural: "Kategoriler",
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      label: "Kategori Adı",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Bağlantı (Slug)",
      type: "text",
      unique: true,
      index: true,
      required: true,
    },
    {
      name: "color",
      label: "Kategori Renk Kodu",
      type: "text",
    },
    {
      name: "parent",
      label: "Üst Kategori",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subcategories",
      label: "Alt Kategoriler",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
    },
  ],
};
