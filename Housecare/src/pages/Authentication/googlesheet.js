import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Alert } from 'reactstrap';
import { BASE_URL } from './handle-api';
import img1 from '../../assets/images/charitymodel.png';

const ExcelImport = ({ isOpen, toggle, onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // Check if file is an Excel file
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || 
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please upload a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/imports/import`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        console.log("Import Successful:", result);
        onImportSuccess();
        toggle();
      } else {
        setError(result.message || "Import failed");
      }
    } catch (err) {
      setError("Error uploading file");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="lg">
      <ModalHeader toggle={toggle}>
        Import Charity Data from Excel
      </ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <label className="form-label">Upload Excel File</label>
          <input
            type="file"
            className="form-control"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
          <small className="text-muted">
            Supported formats: .xlsx, .xls
          </small><br/>
          <small className="text-danger">use this model template</small>
          <img src={img1} alt="Excel" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </div>

        {error && (
          <Alert color="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <div className="text-center">
        <Button color="primary" onClick={handleImport} disabled={loading || !file}>
  {loading ? "Importing..." : "Import Data"}
</Button>

          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ExcelImport;