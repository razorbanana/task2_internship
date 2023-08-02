//масив з компонентами іконок
const icons: Record<string, string> = {
  Task: `shopping_cart`,
  Quote: `format_quote`,
  'Random Thought': `psychology`,
  Idea: `lightbulb`,
  edit: `edit`,
  unarchive: `unarchive`,
  archive: `archive`,
  delete: `delete`
};

//отримати іконки
const getIcon = (category:string) => {
    return icons[category]
}

export default getIcon