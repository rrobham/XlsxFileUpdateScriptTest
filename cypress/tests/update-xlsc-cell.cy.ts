import { data } from 'cypress/types/jquery';
import xlsx from 'node-xlsx';

const XLSX = require("xlsx");

describe('update excel cell value', () => {


    it('read data from excel', () => {
        
        cy.getFilesList('cypress/fixtures/batch1').then( (files) => {
            //cy.log(files.name)
            files.forEach(file => {
                cy.log(file.name)
                
                cy.parseXlsx(`cypress/fixtures/batch1/${file}`).then( (jsonData) => {
                    const rowLength = Cypress.$(jsonData[0].data).length;
                    //console.log("rowLength "+ rowLength);
                    let employeeData = jsonData[0].data;

                    let today = new Date();
                    const namePrefix = '-'+String(today.getMonth() + 1)+String(today.getDate())+String(today.getFullYear())
                    console.log(namePrefix);
                    
                    for(let index = 0; index < rowLength-1; index++){
                        console.log("Index: " + index); 
                       console.log(employeeData[index]);  
                        if(index !== 0){
                            employeeData[index][3] = employeeData[index][3].replace(/-.*/, namePrefix);
                            employeeData[index][4] = employeeData[index][4].replace(/-.*/, namePrefix);                            
                            let newSalary = Math.floor(Math.random() * (5000 - 1000)) + 1000;                
                           employeeData[index][6] = newSalary;
                        }                          
                    }
                    
                    const newWB = XLSX.utils.book_new();
                    const newWS = XLSX.utils.json_to_sheet(employeeData,{skipHeader:true});
                    XLSX.utils.book_append_sheet(newWB, newWS, "Update Employees");
        
                    //const newfileName = "cypress/fixtures/EmployeeUpdate.xlsx";
                    //const saveAs = newfileName;
                    cy.saveXlsx(newWB, `cypress/fixtures/batch1/${file}`);
                })
                
            })

        
        })
    })

})