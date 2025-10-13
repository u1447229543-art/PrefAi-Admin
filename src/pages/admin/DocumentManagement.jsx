import { useState, useEffect } from "react";
import { useGetDocumentQuery, useDeleteDocumentMutation } from "../../services/api";
import DocumentCard from "../../components/DocumentCard";

const DomumentManagement = () => {
  const [deleteDocument] = useDeleteDocumentMutation();
  const { data: getDocuments } = useGetDocumentQuery();

  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    if (getDocuments?.data?.length) {
      console.log(getDocuments?.data);
      setDocumentList(getDocuments?.data);
    }
  }, [getDocuments]);

  return (
    <>
      <div className="container mx-auto p-6 max-w-6xl bg-white shadow-lg rounded-xl">
        <div className="text-2xl font font-semibold py-4 text-primary-2">
          User Documents
        </div>
        <div className="flex gap-4 flex-wrap">
          {documentList.map((item) => {
            return (
              <DocumentCard
                title={item.name}
                image={item.uri}
                type={item.type}
                userName={item.userId.firstName}
                email={item.userId.email}
                folderName={item.folderId.folderName}
                onDelete={()=>deleteDocument(item._id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DomumentManagement;
