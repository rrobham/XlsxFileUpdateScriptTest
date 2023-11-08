// load the global Cypress types
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {       
     
      parseXlsx(inputFile);

      saveXlsx(workBook, filePath);

      getFilesList(directoryPath);

      connectFTP(directoryPath);
    }
  }
  