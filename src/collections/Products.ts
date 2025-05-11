import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  labels: {
    singular: "Ürün",
    plural: "Ürünler",
  },
  fields: [
    {
      name: "name",
      label: "Ürün Adı",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Açıklama",
      type: "text",
    },
    {
      name: "price",
      label: "Fiyat",
      type: "number",
      required: true,
      admin: {
        description: "TL cinsinden fiyat",
      },
    },
    {
      name: "category",
      label: "Kategori", // ✅
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      label: "Etiket",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      label: "Ürün Görseli",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "refundPolicy",
      label: "İade Politikası",
      type: "select",
      options: [
        "30-gün",
        "14-gün",
        "7-gün",
        "3-gün",
        "1-gün",
        "Geri ödeme yapılmaz",
      ],
      defaultValue: "30-gün",
    },
  ],
};
