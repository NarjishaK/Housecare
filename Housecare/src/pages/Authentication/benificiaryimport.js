import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button, Alert } from 'reactstrap';
import { BASE_URL } from './handle-api';
import img1 from '../../assets/images/benificiary.png';
import * as XLSX from "xlsx";

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
      setError('Please select a file before importing.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/imports/importbeneficiaries`, {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        onImportSuccess();
        setFile(null);
      } else {
        setError(result.error || 'Failed to import data');
      }
    } catch (error) {
      setError('Error importing file');
    }
    setLoading(false);
  };
  
  
    const handleDownloadTemplate = () => {
      const headings = [
        ["benificiary_name","number","email_id","charity_name","nationality","sex","health_status","marital","navision_linked_no","physically_challenged","family_members","account_status","Balance","category","age"],
      ];
    
      const worksheet = XLSX.utils.aoa_to_sheet(headings);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Template");
    
      // Create a Blob and trigger a download
      XLSX.writeFile(workbook, "Benificiary_Template.xlsx");
    };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered" size="xl">
      <ModalHeader toggle={toggle}>
        Import Benificiary Data from Excel
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
        <Button color="primary" onClick={handleImport} disabled={loading || !file} style={{ marginRight: '10px' }}>
  {loading ? "Importing..." : "Import Data"}
</Button>

 <Button color="primary" onClick={handleDownloadTemplate} style={{ marginRight: "10px" }}>
            Download Template
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