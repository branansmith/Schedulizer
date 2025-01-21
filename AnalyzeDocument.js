// Import required AWS SDK clients and commands for Node.js
const { AnalyzeDocumentCommand } = require("@aws-sdk/client-textract");
const { TextractClient } = require("@aws-sdk/client-textract");
const {fromIni} = require('@aws-sdk/credential-providers');

// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
const profileName = "AdminUser";

// Create SNS service object.
const textractClient = new TextractClient({region: REGION, 
  credentials: fromIni({profile: profileName,}), 
});

const bucket = 'canyouseeme15'
const photo = 'demotest.jpg'

// Set params
const params = {
    Document: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      },
    },
    FeatureTypes: ['TABLES', 'FORMS', 'SIGNATURES'],
  }

const displayBlockInfo = async (response) => {
    try {
        response.Blocks.forEach(block => {
            console.log(`ID: ${block.Id}`)
            console.log(`Block Type: ${block.BlockType}`)
            if ("Text" in block && block.Text !== undefined){
                console.log(`Text: ${block.Text}`)
            }
            else{}
            if ("Confidence" in block && block.Confidence !== undefined){
                console.log(`Confidence: ${block.Confidence}`)
            }
            else{}
            if (block.BlockType == 'CELL'){
                console.log("Cell info:")
                console.log(`   Column Index - ${block.ColumnIndex}`)
                console.log(`   Row - ${block.RowIndex}`)
                console.log(`   Column Span - ${block.ColumnSpan}`)
                console.log(`   Row Span - ${block.RowSpan}`)
            }
            if ("Relationships" in block && block.Relationships !== undefined){
                console.log(block.Relationships)
                console.log("Geometry:")
                console.log(`   Bounding Box - ${JSON.stringify(block.Geometry.BoundingBox)}`)
                console.log(`   Polygon - ${JSON.stringify(block.Geometry.Polygon)}`)
            }
            console.log("-----")
        });
      } catch (err) {
        console.log("Error", err);
      }
}

const analyze_document_text = async () => {
    try {
        const analyzeDoc = new AnalyzeDocumentCommand(params);
        const response = await textractClient.send(analyzeDoc);
        //console.log(response)
        displayBlockInfo(response)
        return response; // For unit tests.
      } catch (err) {
        console.log("Error", err);
      }
}

analyze_document_text()