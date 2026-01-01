import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

import { PDFDocument, rgb } from 'pdf-lib';
import { readFile, writeFile } from 'fs/promises';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
//   generateNewPDF();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};





const generateNewPDF = async () => {
  const pdfBytes = await readFile('templete.pdf');
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const page = pdfDoc.getPages()[0];

  // 1. Draw white rectangle (cover old text)
  page.drawRectangle({
    x: 425, // from left
    y: 730, // from bottom
    width: 100,
    height: 20,
    color: rgb(1, 1, 1), // WHITE
  });

  // 2. Draw new text
  page.drawText('13 july 2025', {
    x: 430,
    y: 735,
    size: 12,
    color: rgb(0, 0, 0),
  });

  const updatedPdf = await pdfDoc.save();
  await writeFile('output.pdf', updatedPdf);
};


export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
