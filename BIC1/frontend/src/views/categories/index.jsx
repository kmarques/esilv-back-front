import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import categoryService from "../../services/category-service";

function CategoryItem({ category, setCategories }) {
  const [editMode, setEditMode] = useState(false);

  async function handleEdit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      title: form.title.value,
      description: form.description.value,
    };

    const content = await categoryService.updateCategory(category.id, values);
    setCategories((prev) =>
      prev.map((item) => (item.id === content.id ? content : item))
    );
  }

  async function handleDelete() {
    await categoryService.deleteCategory(category.id);
    setCategories((prev) => prev.filter((item) => item.id !== category.id));
  }

  return (
    <>
      <div data-test-id={category.id}>
        <span>{category.title}</span>
        <span style={{ marginLeft: 5 }}>{category.description}</span>
        <Button
          variant="icon"
          title="v"
          onClick={() => setEditMode((prev) => !prev)}
        />
        <Button variant="delete" title="X" onClick={handleDelete} />
      </div>
      {editMode && (
        <form onSubmit={handleEdit}>
          <input
            name="title"
            placeholder="title"
            defaultValue={category.title}
          />
          <textarea
            name="description"
            placeholder="description"
            defaultValue={category.description}
          ></textarea>
          <Button title="Mettre à jour" type="submit" />
        </form>
      )}
    </>
  );
}

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("Load categories");
    categoryService
      .getCategories()
      .then((data) => setCategories(data))
      .then(() => alert("Categories loadded"))
      .catch((e) => alert(e));
  }, []);

  async function handleCreate(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      title: form.title.value,
      description: form.description.value,
    };
    const content = await categoryService.createCategory(values);
    setCategories((prev) => [...prev, content]);
    form.reset();
  }

  return (
    <div>
      <h2>Create Category</h2>
      <form onSubmit={handleCreate}>
        <input name="title" placeholder="title" />
        <textarea name="description" placeholder="description"></textarea>
        <Button title="Créer" type="submit" />
      </form>
      <h2>Mes catégories ({categories.length})</h2>
      {categories.map((item) => (
        <CategoryItem category={item} setCategories={setCategories} />
      ))}
      {categories.length === 0 && <p>Aucune catégorie disponible.</p>}
    </div>
  );
}
