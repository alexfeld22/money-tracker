import { ICategory } from "./../../types/category";
import { CategoryModel } from "./models";

export const dbService = {
  getCategoryById: async (categoryId: string) => {
    try {
      const category = await CategoryModel.findById(categoryId);
      if (category?.uuid)
        return {
          uuid: category.uuid,
          categoryName: category.categoryName,
          parentCategoryUUID: category?.parentCategoryUUID,
        };
    } catch (error) {
      console.error(error);
    }
    return null;
  },
};
