import { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "slug",
  },

  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Dükkan Adı",
      admin: {
        description: "Burada Dükkan ismi bulunmaktadır. (Can'ın Dükkanı gibi)",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      admin: {
        description:
          "Bu alan, mağazaya özel alt alan adını belirtir (örn: [slug].takaskutusu.com)",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      admin: {
        description: "Stripe bilgilerinizi göndermeden ürün oluşturamazsınız",
      },
    },
  ],
};
