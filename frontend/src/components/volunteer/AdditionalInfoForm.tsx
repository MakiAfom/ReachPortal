import React, { useState } from "react";
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";

interface AdditionalInfoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ open, onClose, onSubmit }) => {
  const [additionalInfo, setAdditionalInfo] = useState<any>({
    job: "",
    phoneNumber: "",
    placeOfWork: "",
    position: "",
    additionalText: "",
    expertise: "", // New field
    experience: 0, // New field
    portfolioUrl: "", // New field
    linkedIn: "", // New field
    availability: "", // New field
  });

  const handleFormSubmit = () => {
    onSubmit(additionalInfo);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add More Information</DialogTitle>
      <DialogContent>
        {/* Existing fields */}
        <TextField
          label="Job"
          variant="outlined"
          value={additionalInfo.job}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, job: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        {/* Add other fields here */}
        <TextField
          label="Expertise"
          variant="outlined"
          value={additionalInfo.expertise}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, expertise: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Experience (years)"
          variant="outlined"
          type="number"
          value={additionalInfo.experience}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, experience: parseInt(e.target.value) })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Portfolio URL"
          variant="outlined"
          value={additionalInfo.portfolioUrl}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, portfolioUrl: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="LinkedIn Profile"
          variant="outlined"
          value={additionalInfo.linkedIn}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, linkedIn: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Availability"
          variant="outlined"
          value={additionalInfo.availability}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, availability: e.target.value })}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        {/* Existing field */}
        <TextField
          label="Additional Text"
          variant="outlined"
          value={additionalInfo.additionalText}
          onChange={(e) => setAdditionalInfo({ ...additionalInfo, additionalText: e.target.value })}
          multiline
          rows={4}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleFormSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdditionalInfoForm;
// import React, { useState } from "react";
// import { DialogTitle,Dialog, DialogContent, DialogActions, Button, TextField } from "@mui/material";

// interface AdditionalInfoFormProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

// const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ open, onClose, onSubmit }) => {
//   const [additionalInfo, setAdditionalInfo] = useState<any>({
//     job: "",
//     phoneNumber: "",
//     placeOfWork: "",
//     position: "",
//     additionalText: "",
//   });

//   const handleFormSubmit = () => {
//     onSubmit(additionalInfo);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add More Information</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="Job"
//           variant="outlined"
//           value={additionalInfo.job}
//           onChange={(e) => setAdditionalInfo({ ...additionalInfo, job: e.target.value })}
//           fullWidth
//           style={{ marginBottom: "10px" }}
//         />
//         <TextField
//           label="Phone Number"
//           variant="outlined"
//           value={additionalInfo.phoneNumber}
//           onChange={(e) => setAdditionalInfo({ ...additionalInfo, phoneNumber: e.target.value })}
//           fullWidth
//           style={{ marginBottom: "10px" }}
//         />
//         <TextField
//           label="Place of Work"
//           variant="outlined"
//           value={additionalInfo.placeOfWork}
//           onChange={(e) => setAdditionalInfo({ ...additionalInfo, placeOfWork: e.target.value })}
//           fullWidth
//           style={{ marginBottom: "10px" }}
//         />
//         <TextField
//           label="Position"
//           variant="outlined"
//           value={additionalInfo.position}
//           onChange={(e) => setAdditionalInfo({ ...additionalInfo, position: e.target.value })}
//           fullWidth
//           style={{ marginBottom: "10px" }}
//         />
//         <TextField
//           label="Additional Text"
//           variant="outlined"
//           value={additionalInfo.additionalText}
//           onChange={(e) => setAdditionalInfo({ ...additionalInfo, additionalText: e.target.value })}
//           multiline
//           rows={4}
//           fullWidth
//           style={{ marginBottom: "10px" }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">Cancel</Button>
//         <Button onClick={handleFormSubmit} color="primary">Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AdditionalInfoForm;