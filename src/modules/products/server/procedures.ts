import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { Category } from "@/payload-types";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.category || input.category === "favicon.ico") {
        // favicon.ico gibi anlamsız category varsa direkt boş veri dönelim
        return {
          docs: [],
          totalDocs: 0,
          page: 1,
          limit: 10,
          totalPages: 0,
          pagingCounter: 0,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        };
      }

      const where: Where = {};

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subCategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subCategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }

        where["category.slug"] = {
          in: [parentCategory.slug, ...subCategoriesSlugs],
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, //populate image
        where,
      });

      return data;
    }),
});
