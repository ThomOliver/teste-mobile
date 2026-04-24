export interface CategoryListProps {
  categories?: any[];
  selectedCategory: string;
  onSelect: (slug: string) => void;
}