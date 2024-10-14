const DeleteArticle = ({ articleId }: { articleId: string }) => {
  const handleDelete = async () => {
    const response = await fetch(`/api/blogs?id=${articleId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data.message);
  };

  return <button onClick={handleDelete}>Delete Article</button>;
};

export default DeleteArticle;
