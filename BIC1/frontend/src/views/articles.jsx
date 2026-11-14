import { useEffect } from "react";
import { useState } from "react";
import MyButton from "../components/button";
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

export default function ArticlesView() {
    const [articles, setArticles] = useState();
    const [editMode, setEditMode] = useState(null);

    useEffect(() => {
        // setTimeout(() => {
        //     setArticles(ARTICLES);
        // }, 2000);
        fetch("http://localhost:3000/articles")
            .then((response) => response.json())
            .then(data => setArticles(data));
    }, []);

    function handleDelete(articleId) {
        fetch("http://localhost:3000/articles/" + articleId, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                setArticles((oldArticles) => oldArticles.filter(article => article.id !== articleId));
            }
        })
    }

    function handleEdit() {
        fetch("http://localhost:3000/articles/" + editMode.id, {
            method: "PATCH",
            body: JSON.stringify(editMode),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setArticles((oldArticles) => oldArticles.map(
                    (oldArticle) => oldArticle.id === data.id ? {
                        ...data
                    } : oldArticle)
                );
                setEditMode(null);
            })
    }
    function handleAdd() {
        fetch("http://localhost:3000/articles", {
            method: "POST",
            body: JSON.stringify(addItem),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                setArticles((oldArticles) => [data, ...oldArticles]);
            })
    }

    function handleChange(event) {
        const key = event.currentTarget.name;
        const value = event.currentTarget.value;
        setEditMode({
            ...(editMode || {}),
            [key]: value
        });
    }

    if (articles === undefined) {
        return <p>Chargement...</p>
    }

    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Created at</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {articles?.length === 0 && <tr>
                <td colSpan={6}>Pas d&apos;articles</td>
            </tr>}
            {articles?.map(article => (
                <Fragment key={article.id}>
                    <tr >
                        <td>{article.id}</td>
                        <td>{article.title}</td>
                        <td>{article.content}</td>
                        <td>{article.createdAt.toLocaleString()}</td>
                        <td>{article.status}</td>
                        <td>
                            <MyButton content="Delete" color="red" handleClick={() => handleDelete(article.id)} />
                            {editMode?.id !== article.id && <MyButton content="Edit" color="blue" handleClick={() => setEditMode(article)} />}
                            {editMode?.id === article.id && <MyButton content="Cancel" color="blue" handleClick={() => setEditMode(null)} />}
                        </td>
                    </tr>
                    {editMode?.id === article.id && <tr key={editMode.id}>
                        <td>{editMode.id}</td>
                        <td><input name="title" value={editMode.title} onChange={handleChange} /></td>
                        <td><textarea name="content" value={editMode.content} onChange={handleChange}></textarea></td>
                        <td>{editMode.createdAt.toLocaleString()}</td>
                        <td><select name="status" value={editMode.status} onChange={handleChange}>
                            <option value="DRAFT">DRAFT</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                        </select></td>
                        <td>
                            <MyButton content="Save" color="blue" handleClick={() => handleEdit(article.id)} />
                        </td>
                    </tr>
                    }
                </Fragment>
            ))}
        </tbody>
    </table>
}