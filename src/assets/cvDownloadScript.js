import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { capitalizeWords } from './utilityFunctions';
import _ from 'lodash';

// Register fonts (if custom fonts are used)
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles= {
    pageMargins:[60,40,60,40],
    name: {
        bold: true,
        fontSize: 16,
        alignment:'center'
    },
    profileInfo:{
        fontSize: 11,
        alignment:'center'
    },
    header:{
        fontSize:14,
        bold:true
    }
  }


  function formatBasicInformation(basicInformation){

  }



export const downloadCV = (cvdata) => {

    const data = Object.entries(cvdata).map((entry,index)=>{

        if (index==0){
            return [...[
                {
                    text:capitalizeWords(entry[1].first_name.replace(/_/g, ' '))+' '+capitalizeWords(entry[1].last_name.replace(/_/g, ' ')),
                    style:'name'
                },
                {
                    text:!_.isEmpty(entry[1].tagline) ? entry[1].tagline:null,
                    style:'profileInfo'
                },
                {
                    text:`${!_.isEmpty(entry[1].mobile_number) ? entry[1].mobile_number:''} ${!_.isEmpty(entry[1].email) ? ' | '+entry[1].email:''}`,
                    style:'profileInfo'
                },
                {
                    text:`${!_.isEmpty(entry[1].street) ? entry[1].street:''} ${!_.isEmpty(entry[1].city) ? ' | '+entry[1].city:''} ${!_.isEmpty(entry[1].state_province_region) ? ' | '+entry[1].state_province_region:''}`,
                    style:'profileInfo'
                }
            ]
        ]
        }
        return {text:capitalizeWords(entry[0].replace(/_/g, ' ')),style:'header'}
    })
    
    const documentDefinition = {
        content: data,
        styles:styles
      };
      
      pdfMake.createPdf(documentDefinition).download('cv.pdf');
}