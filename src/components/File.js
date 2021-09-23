import { useDispatch, useSelector } from "react-redux";
import { getFileById } from "../store/actions/file";
import Toast from "./Toast";

const File = ({ file }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.file);

  const onDownload = async (e) => {
    e.preventDefault();
    dispatch(getFileById(file._id));
  };

  return (
    <>
      <div className="col-auto">
        <a className="text-muted" onClick={onDownload}>
          {file.originalName}
        </a>
      </div>
      {error && (
        <Toast
          type="error"
          title="Скачивание файла"
          message="При скачивании файла произошла ошибка"
        />
      )}
    </>
  );
};

export default File;
