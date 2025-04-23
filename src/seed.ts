import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "Tümü",
    slug: "all",
  },
  {
    name: "Elektronik",
    color: "#7EC8E3",
    slug: "electronics",
    subcategories: [
      { name: "Cep Telefonları", slug: "mobile-phones" },
      { name: "Bilgisayarlar", slug: "computers" },
      { name: "Tabletler", slug: "tablets" },
      { name: "Televizyonlar", slug: "televisions" },
      { name: "Aksesuarlar", slug: "accessories" },
    ],
  },
  {
    name: "Giyim",
    color: "#FFB6C1",
    slug: "clothing",
    subcategories: [
      { name: "Kadın Giyim", slug: "women-clothing" },
      { name: "Erkek Giyim", slug: "men-clothing" },
      { name: "Çocuk Giyim", slug: "kids-clothing" },
      { name: "Ayakkabı", slug: "shoes" },
      { name: "Aksesuar", slug: "accessories" },
    ],
  },
  {
    name: "Ev ve Yaşam",
    color: "#FFE066",
    slug: "home-living",
    subcategories: [
      { name: "Mobilya", slug: "furniture" },
      { name: "Dekorasyon", slug: "decoration" },
      { name: "Mutfak Ürünleri", slug: "kitchen-products" },
      { name: "Temizlik Ürünleri", slug: "cleaning-products" },
    ],
  },
  {
    name: "Kozmetik & Kişisel Bakım",
    color: "#FF9AA2",
    slug: "cosmetics-personal-care",
    subcategories: [
      { name: "Makyaj", slug: "makeup" },
      { name: "Cilt Bakımı", slug: "skincare" },
      { name: "Saç Bakımı", slug: "haircare" },
      { name: "Parfüm", slug: "perfume" },
    ],
  },
  {
    name: "Anne & Bebek",
    color: "#D8B5FF",
    slug: "mother-baby",
    subcategories: [
      { name: "Bebek Giyim", slug: "baby-clothing" },
      { name: "Bebek Bezi", slug: "diapers" },
      { name: "Mama & Beslenme", slug: "baby-nutrition" },
      { name: "Oyuncaklar", slug: "toys" },
    ],
  },
  {
    name: "Spor & Outdoor",
    color: "#B5B9FF",
    slug: "sports-outdoor",
    subcategories: [
      { name: "Spor Giyim", slug: "sportswear" },
      { name: "Kamp & Outdoor", slug: "camping-outdoor" },
      { name: "Spor Aletleri", slug: "fitness-equipment" },
      { name: "Bisiklet & Scooter", slug: "bikes-scooters" },
    ],
  },
  {
    name: "Hobi & Oyuncak",
    color: "#FFD700",
    slug: "hobbies-toys",
    subcategories: [
      { name: "Maket & Puzzle", slug: "models-puzzles" },
      { name: "Hobi Malzemeleri", slug: "hobby-materials" },
      { name: "Oyunlar", slug: "games" },
      { name: "Koleksiyon", slug: "collections" },
    ],
  },
  {
    name: "Kitap, Müzik ve Film",
    color: "#96E6B3",
    slug: "books-music-movies",
    subcategories: [
      { name: "Kitaplar", slug: "books" },
      { name: "Müzik CD'leri", slug: "music-cds" },
      { name: "Filmler", slug: "movies" },
      { name: "E-kitaplar", slug: "ebooks" },
    ],
  },
  {
    name: "Otomotiv & Motosiklet",
    color: "#FF6B6B",
    slug: "automotive-motorcycle",
    subcategories: [
      { name: "Araç Aksesuarları", slug: "vehicle-accessories" },
      { name: "Yedek Parça", slug: "spare-parts" },
      { name: "Motor Giyimi", slug: "motorcycle-gear" },
      { name: "Temizlik ve Bakım", slug: "vehicle-care" },
    ],
  },
  {
    name: "Diğer",
    slug: "others",
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seeding completed succesfully");
  process.exit(0);
} catch (error) {
  console.error("Error during seeding: ", error);
  process.exit(1);
}
