export type userCategoryResponse = {
    category_id: number;
    category_name: string;
    category_img_name: string;
    total_amount: number;
    max_amount: number;
    transaction_types: "EXPENSE" | "INCOME";
}
