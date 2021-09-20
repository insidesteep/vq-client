const File = ({ file }) => {
  const onDownload = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:5000/api/files/download/${file._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.originalName;
      // document.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <div className="col-auto">
      <a className="text-muted" onClick={onDownload}>
        {file.originalName}
      </a>
    </div>
  );
};

export default File;
