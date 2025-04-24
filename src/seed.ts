import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "Tümü",
    slug: "01-all",
  },
  {
    name: "Elektronik",
    color: "#7091E6",
    slug: "02-electronics",
    subcategories: [
      { name: "Cep Telefonları", slug: "electronics-mobile-phones" },
      { name: "Bilgisayarlar", slug: "electronics-computers" },
      { name: "Tabletler", slug: "electronics-tablets" },
      { name: "Televizyonlar", slug: "electronics-televisions" },
      { name: "Aksesuarlar", slug: "electronics-accessories" },
    ],
  },
  {
    name: "Giyim",
    color: "#ADBBDA",
    slug: "03-clothing",
    subcategories: [
      { name: "Kadın Giyim", slug: "clothing-women-clothing" },
      { name: "Erkek Giyim", slug: "clothing-men-clothing" },
      { name: "Çocuk Giyim", slug: "clothing-kids-clothing" },
      { name: "Ayakkabı", slug: "clothing-shoes" },
      { name: "Aksesuar", slug: "clothing-accessories" },
    ],
  },
  {
    name: "Ev ve Yaşam",
    color: "#8697C4",
    slug: "04-home-living",
    subcategories: [
      { name: "Mobilya", slug: "home-living-furniture" },
      { name: "Dekorasyon", slug: "home-living-decoration" },
      { name: "Mutfak Ürünleri", slug: "home-living-kitchen-products" },
      { name: "Temizlik Ürünleri", slug: "home-living-cleaning-products" },
    ],
  },
  {
    name: "Kozmetik & Kişisel Bakım",
    color: "#3D52A0",
    slug: "05-cosmetics-personal-care",
    subcategories: [
      { name: "Makyaj", slug: "cosmetics-personal-care-makeup" },
      { name: "Cilt Bakımı", slug: "cosmetics-personal-care-skincare" },
      { name: "Saç Bakımı", slug: "cosmetics-personal-care-haircare" },
      { name: "Parfüm", slug: "cosmetics-personal-care-perfume" },
    ],
  },
  {
    name: "Anne & Bebek",
    color: "#ADBBDA",
    slug: "06-mother-baby",
    subcategories: [
      { name: "Bebek Giyim", slug: "mother-baby-baby-clothing" },
      { name: "Bebek Bezi", slug: "mother-baby-diapers" },
      { name: "Mama & Beslenme", slug: "mother-baby-baby-nutrition" },
      { name: "Oyuncaklar", slug: "mother-baby-toys" },
    ],
  },
  {
    name: "Spor & Outdoor",
    color: "#7091E6",
    slug: "07-sports-outdoor",
    subcategories: [
      { name: "Spor Giyim", slug: "sports-outdoor-sportswear" },
      { name: "Kamp & Outdoor", slug: "sports-outdoor-camping-outdoor" },
      { name: "Spor Aletleri", slug: "sports-outdoor-fitness-equipment" },
      { name: "Bisiklet & Scooter", slug: "sports-outdoor-bikes-scooters" },
    ],
  },
  {
    name: "Hobi & Oyuncak",
    color: "#8697C4",
    slug: "08-hobbies-toys",
    subcategories: [
      { name: "Maket & Puzzle", slug: "hobbies-toys-models-puzzles" },
      { name: "Hobi Malzemeleri", slug: "hobbies-toys-hobby-materials" },
      { name: "Oyunlar", slug: "hobbies-toys-games" },
      { name: "Koleksiyon", slug: "hobbies-toys-collections" },
    ],
  },
  {
    name: "Kitap, Müzik ve Film",
    color: "#ADBBDA",
    slug: "09-books-music-movies",
    subcategories: [
      { name: "Kitaplar", slug: "books-music-movies-books" },
      { name: "Müzik CD'leri", slug: "books-music-movies-music-cds" },
      { name: "Filmler", slug: "books-music-movies-movies" },
      { name: "E-kitaplar", slug: "books-music-movies-ebooks" },
    ],
  },
  {
    name: "Otomotiv & Motosiklet",
    color: "#3D52A0",
    slug: "10-automotive-motorcycle",
    subcategories: [
      {
        name: "Araç Aksesuarları",
        slug: "automotive-motorcycle-vehicle-accessories",
      },
      { name: "Yedek Parça", slug: "automotive-motorcycle-spare-parts" },
      { name: "Motor Giyimi", slug: "automotive-motorcycle-motorcycle-gear" },
      { name: "Temizlik ve Bakım", slug: "automotive-motorcycle-vehicle-care" },
    ],
  },
  {
    name: "Diğer",
    slug: "11-others",
    color: "#B0BCE3",
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
