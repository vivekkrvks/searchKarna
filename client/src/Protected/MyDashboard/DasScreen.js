import { Link } from "react-router-dom";
import  React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { MainContext } from "../../Components/Context/MainContext";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));
export default function DasScreen() {
  const { state, dispatch } = useContext(MainContext);
  const designationId = state.designation.id;
  return (
      <>
     
<Grid container spacing={3}>
<Grid item xs={12} md={12}>
<Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gap: 2,
              }}
            >
                <Grid container spacing={3}>
                {data.map((l,i) => (
                  (designationId==="admin" || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
                ( <Grid item xs={12} md={6}>
                 <Link to={l.link} >
                 <Item key={l.ele} elevation={l.ele}>
                  {l.title}
                </Item>
                </Link>
                 </Grid>)
           
              ))}

  </Grid>
  
  </Box>
  </Grid>
</Grid>  </>
   
  );
}

const data = [{title:'Dashboard',link:"/dashboard",ele:8},
{title:'Check Page',link:"/check",ele:8},
{title:'Add Users',link:"/AddUser",ele:8},
{title:'First Page',link:"/firstpage",ele:8},
{title:'Add Category',link:"/AddCategory",ele:8},
{title:'Add Sub Category',link:"/AddSubCategory",ele:8},
{title:'Add Service',link:"/AddService",ele:8},
{title:'Add business',link:"/AddBusiness",ele:8,supervisor:true,fieldPartner:true},
{title:'View Listings',link:"/GetBusiness",ele:8,supervisor:true,fieldPartner:true},
{title:'Location Master',link:"/LocationMaster",ele:8},
{title:'Sign Up',link:"/signup",ele:8},
{title:'Login',link:"/login",ele:8}]


