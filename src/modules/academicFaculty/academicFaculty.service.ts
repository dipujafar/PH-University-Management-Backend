import { FreedomFormData, TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";


const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};



  // Function to fill the PDF form
const fillFreedomPdf = async (data: FreedomFormData): Promise<void> => {
  try {
    // Use process.cwd() to get the current working directory
    const pdfPath = path.join(process.cwd(), 'freedom-report.pdf');
    console.log('Looking for PDF at:', pdfPath);

    // Check if the file exists before reading it
    if (!fs.existsSync(pdfPath)) {
      console.error('PDF file not found at:', pdfPath);
      return;
    }

    const existingPdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Fill in the form fields with the data
    form.getTextField('name').setText(data.name);
    form.getTextField('desired-annual-income').setText(data.desiredAnnualIncome);
    form.getTextField('non-investment-annual-income').setText(data.expectedNonInvestmentIncome);
    form.getTextField('wealth_outside').setText(data.businessOwnershipOutlook);
    form.getTextField('outstanding_personal').setText(data.personalDebts);
    form.getTextField('professional_fees_and_commissions').setText(data.professionalFees);
    form.getTextField('employee_thank_yous').setText(data.employeeRetentionBonuses);
    form.getTextField('outstanding_debt_minus').setText(data.outstandingDebtOnHand);
    form.getTextField('net_proceeds').setText(data.taxOnProceeds);

    const pdfBytes = await pdfDoc.save();
    const newPdfPath = path.join(process.cwd(), 'filled_pdf.pdf');
    fs.writeFileSync(newPdfPath, pdfBytes);

    console.log('PDF filled and saved to', newPdfPath);
  } catch (error) {
    console.error('Error filling PDF form:', error);
  }
};


export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  fillFreedomPdf
};
