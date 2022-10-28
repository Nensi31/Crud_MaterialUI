import * as React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// const pattern= /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/



const currencies = [
  {
    value: "Rajkot",
    label: "Rajkot",
  },
  {
    value: "Surat",
    label: "Surat",
  },
  {
    value: "Ambd",
    label: "Ambd",
  },
  {
    value: "Baroda",
    label: "Baroda",
  },
];
const columns = [
  {
    field: "uname",
    headerName: "Username",
    width: 150,
    editable: true,
  },
  {
    field: "pswd",
    headerName: "pswd",
    width: 150,
    editable: true,
  },
  {
    field: "gender",
    headerName: "gender",
    width: 110,
    editable: true,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
    editable: true,
  },
];

export default function Crudm() {
  const [input, setInput] = React.useState({
    id: 1,
    uname: "",
    pswd: "",
    gender: "",
    city: "",
  });

  const [data, setData] = React.useState([]); 
  
  const [isEdit, setIsEdit] = React.useState(-1);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value, id: uuidv4() });
    // console.log({ ...input, [name]: value });
  };

  const handleSubmit = () => {
    if (isEdit === -1) {
      setData([...data, input]);

      console.log(data);
      localStorage.setItem("datagrid", JSON.stringify([...data, input]) || []);
    } else {
      const updated = data.map((item, index) => {
        if (index === isEdit) {
          return input;
        }
        return item;
      });
      setData(updated);
      setIsEdit(-1);
    }
    clear();
  };
  const clear = () => {
    setInput({
      id: "",
      uname: "",
      pswd: "",
      gender: "",
      city: "",
    });
  };
  const Edit = (id) => {
    const newrcrd = data.find((item, index) => {
      return index === id;
    });
    setInput(newrcrd);
    setData([...data, input]);
    setIsEdit(id);
  };

  const handleDelete = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData([...updated]);
  };

   
  return (
    <div className="App">
     
          
            <FormControl>
              <TextField
                className="TextField"
                label="Username"
                name="uname"
                variant="outlined"
                value={input.uname}
                onChange={handleOnchange}
              />
              {/* {console.log(errors)}
              {errors.uname && touched.uname ? <div>{errors.uname}</div> : null} */}
              <TextField
                className="TextField"
                label="pswd"
                name="pswd"
                variant="outlined"
                value={input.pswd}
                onChange={handleOnchange}
               
              />

              <FormLabel component= "legend" id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
               
              >
                <FormControlLabel
                  value="female"
                  name="gender"
                  onChange={handleOnchange}
                  checked={input.gender === "female"}
                  control={<Radio />}
                  label="Female"
                 
                />
                <FormControlLabel
                  value="male"
                  name="gender"
                  onChange={handleOnchange}
                  checked={input.gender === "male"}
                  control={<Radio />}
                  label="Male"
                 
                />
                <FormControlLabel
                  value="other"
                  name="gender"
                  onChange={handleOnchange}
                  checked={input.gender === "other"}
                  control={<Radio />}
                  label="Other"
                 
                />
              </RadioGroup>
             
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-select-currency"
                  select
                  name="city"
                  label="Select"
                  value={input.city}
                  onChange={handleOnchange}
                  className="TextField"
                
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              
              <Stack direction="row" spacing={2}>
                <Button
                 onClick={handleSubmit}
                  variant="contained"
                  endIcon={<SendIcon />}
                  fullWidth
                >
                  Send
                </Button>
              </Stack>
            </FormControl>
      
       
     

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">pswd&nbsp;(g)</TableCell>
              <TableCell align="center">Gender&nbsp;(g)</TableCell>
              <TableCell align="center">City&nbsp;(g)</TableCell>
              <TableCell align="center">Action&nbsp;(g)</TableCell>
              <TableCell align="center">Action&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item.index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.uname}</TableCell>
                <TableCell align="center">{item.pswd}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">{item.city}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => Edit(index)}>Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleDelete(index)} color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
