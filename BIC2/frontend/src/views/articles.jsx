import { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import { Fragment } from "react";

const ARTICLES = [
    {
        id: 1,
        title: "Article 1",
        content: "Content 1",
        createdAt: new Date(2025, 3, 24),
        status: "PUBLISHED"
    },
    {
        id: 2,
        title: "Article 2",
        content: "Content 2",
        createdAt: new Date(2025, 4, 24),
        status: "DRAFT"
    },
    {
        id: 3,
        title: "Article 3",
        content: "Content 3",
        createdAt: new Date(2025, 5, 24),
        status: "PUBLISHED"
    },
    {
        id: 4,
        title: "Article 4",
        content: "Content 4",
        createdAt: new Date(2025, 6, 24),
        status: "DRAFT"
    }
];

const ARTICLES_EMPTY = [];

const DEFAULT_ITEM = {
    title: "",
    content: "",
    status: "DRAFT"
};

export default function Articles() {
    const [articles, setArticles] = useState();
    const [editItem, setEditItem] = useState(null);
    const [addItem, setAddItem] = useState(DEFAULT_ITEM);

    useEffect(() => {
        fetch('http://localhost:3000/api/articles')
            .then(response => response.json())
            .then(data => setArticles(data));
    }, []);

    function handleDelete(articleId) {
        fetch("http://localhost:3000/api/articles/" + articleId, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                setArticles(
                    (oldArticles) =>
                        oldArticles.filter(item => item.id !== articleId)
                );
            }
        })
    }

    function handleChange(event) {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value;

        setEditItem((oldValue) => ({
            ...oldValue,
            [key]: value
        }))
    }
    function handleAddChange(event) {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value;

        setAddItem((oldValue) => ({
            ...oldValue,
            [key]: value
        }))
    }

    function handleSave() {
        fetch("http://localhost:3000/api/articles/" + editItem.id, {
            method: "PATCH",
            body: JSON.stringify(editItem),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                setArticles((oldArticles) =>
                    oldArticles.map(oldArticle =>
                        oldArticle.id === data.id ? data : oldArticle
                    )
                );
                setEditItem(null);

            })
    }
    function handleAdd() {

        fetch("http://localhost:3000/api/articles", {
            method: "POST",
            body: JSON.stringify(addItem),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setArticles((oldArticles) => [...oldArticles, data]);
                setAddItem({ ...DEFAULT_ITEM });
            })
    }

    if (articles === undefined) return <p>Chargement...</p>;
    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {articles?.length === 0 && <tr>
                <td colSpan={6}>Pas d&apos;articles.</td>
            </tr>}
            {articles?.map(article => <Fragment key={article.id}>
                <tr>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.content}</td>
                    <td>{article.createdAt.toLocaleString()}</td>
                    <td>{article.status}</td>
                    <td>
                        {editItem?.id === article.id && <Button content="Cancel" onClick={() => setEditItem(null)} />}
                        {editItem?.id !== article.id && <Button content="Edit" onClick={() => setEditItem({ ...article })} />}
                        <Button content="Delete" onClick={() => handleDelete(article.id)} />
                    </td>
                </tr>
                {editItem?.id === article.id && <tr>
                    <td>{article.id}</td>
                    <td><input name="title" value={editItem.title} onChange={handleChange} /></td>
                    <td><textarea name="content" value={editItem.content} onChange={handleChange}></textarea></td>
                    <td>{article.createdAt.toLocaleString()}</td>
                    <td>
                        <select name="status" value={editItem.status} onChange={handleChange}>
                            <option value="DRAFT">DRAFT</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                        </select>
                    </td>
                    <td>
                        <Button content="Save" onClick={handleSave} />
                    </td>
                </tr>}
            </Fragment>
            )}
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td><input name="title" value={addItem.title} onChange={handleAddChange} /></td>
                <td><textarea name="content" value={addItem.content} onChange={handleAddChange}></textarea></td>
                <td></td>
                <td>
                    <select name="status" value={addItem.status} onChange={handleAddChange}>
                        <option value="DRAFT">DRAFT</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                </td>
                <td>
                    <Button content="Add" onClick={handleAdd} />
                </td>
            </tr>
        </tfoot>
    </table>
}