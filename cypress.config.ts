import { defineConfig } from "cypress";
const xlsx = require('node-xlsx').default;
const fs = require('fs');
const path = require('path');

const XLSX = require("xlsx");

const Client = require('ftp');

export default defineConfig({
  video: true,
  videosFolder: 'cypress/videos',
  e2e: {
    specPattern: "cypress/tests/*.cy.ts",
    supportFile:  "cypress/support/e2e.ts",
    screenshotOnRunFailure: true,
    env:{
      ftpHost: '',
      ftpPort: 22,
      ftpUser: '',
      ftpPassword: ''
    },
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
        getFiles(props){    
          let ftpclient = new Client();
          return new Promise((resolve, reject) =>{            
            ftpclient.on('ready', function() {
              //try{
              //  const files = fs.readdirSync(directoryPath);                
              //  resolve(files);
              //}catch(e){
              //  reject(e);
              //}
              resolve("FTP ON READY")
              ftpclient.end();
            }); 
            ftpclient.on('error', function(err: any) {
              reject(err);
            })     
                    
            ftpclient.connect({host: props.host, port: 22, user: props.user, password: props.password, connTimeout: 60000});              
          })
        }
      });
    }
  }
});
