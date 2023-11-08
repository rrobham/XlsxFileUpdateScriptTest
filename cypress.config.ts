import { defineConfig } from "cypress";
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const path = require('path');

const XLSX = require("xlsx");

const Client = require('ftp');

export default defineConfig({
  video: false,
  e2e: {
    specPattern: "cypress/tests/*.cy.ts",
    supportFile:  "cypress/support/e2e.ts",
    //env: {
    //  downloadsFolder: "cypress/fixtures",
   //},
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message: any) {
          console.log(message)
          return null
        },
        error(message: any) {
          console.error(message)
          return null
        },
        parseXlsx({filePath}){
          return new Promise((resolve, reject) =>{
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          })
        },
        saveXlsx({workBook, filePath}){
          try{
            XLSX.writeFile(workBook, filePath);
          }catch (e){
            console.log(e)
          }
          return null;
        },
        getFilesList({directoryPath}){
          console.log("get list")
          try{
            const files = fs.readdirSync(directoryPath);
            return files;
          } catch(e){
            console.log(e);
            return null
          }
        },
        connectFTP({directoryPath}){    
          let c = new Client();
          try{
            c.on('ready', function() {
              c.list(function(err, list) {
                if (err) throw err;
                console.log(list);
              
                c.end();

                return list;
              });
            });
            // connect to localhost:21 as anonymous
            c.connect({secure:false});
            
          }catch(e){
            return null;
          }

        }
      });
    },
  },
});