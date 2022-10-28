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
import { useForm } from "react-hook-form";

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
// const columns = [
//   {
//     field: "uname",
//     headerName: "Username",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "pswd",
//     headerName: "pswd",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "gender",
//     headerName: "gender",
//     width: 110,
//     editable: true,
//   },
//   {
//     field: "city",
//     headerName: "City",
//     width: 150,
//     editable: true,
//   },
// ];

export default function Crudr() {
  const [input, setInput] = React.useState({
    uname: "",
    pswd: "",
    gender: "",
    city: "",
  });

  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("datagrid") || [])
  );

  const [isEdit, setIsEdit] = React.useState(-1);
  
  const {
    register,
    handleSubmit,
   
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value, id: uuidv4() });
    // console.log({ ...input, [name]: value });
  };

  const handleSubmit1 = () => {
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
    reset(newrcrd);
    setData([...data, input]);
    setIsEdit(id);
  };

  const handleDelete = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData([...updated]);
  };

  const onSubmit = (data1) => {
    console.log(data1);
    if (isEdit === -1) {
      setData([...data, data1]);

      console.log(data);
      localStorage.setItem("datagrid", JSON.stringify([...data, data1]) || []);
     
    } else {
      const updated = data.map((item, index) => {
        if (index === isEdit) {
          return data1;
        }
        return item;
      });
      setData(updated);
      setIsEdit(-1);
     
    }
    reset()
  };

 
  console.log(watch("uname"));
  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            className="TextField"
           label="username"
            {...register("uname", { required: true })}
            variant="outlined"
          />
          <div style={{ color: "red" }}>
            {errors.uname && <span>Username is required</span>}
          </div>
          {/* {console.log(errors)}
              {errors.uname && touched.uname ? <div>{errors.uname}</div> : null} */}
          <TextField
            className="TextField"
            
            variant="outlined"
            {...register("pswd", { required: true })}
          />
          <div style={{ color: "red" }}>
            {errors.pswd && <span>password is required</span>}
          </div>
          <FormLabel component="legend" id="demo-row-radio-buttons-group-label">
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
         
          >
            <input
            type="radio"
              value={"female"}
            
              //   onChange={handleOnchange}
              //   checked={input.gender === "female"}
              // control={<Radio />}
              // label="Female"
              {...register("gender", { required: true })}
            />Female

            <input type="radio"
              value="male"
              //   onChange={handleOnchange}
              //   checked={input.gender === "male"}
            name="gender"
              // control={<Radio />}
              label="Male"
              {...register("gender", { required: true })}
            />Male

            <input type="radio"
      
              value="other"
              //   onChange={handleOnchange}
              //   checked={input.gender === "other"}
            name="gender"
              control={<Radio />}
              label="Other"
              {...register("gender", { required: true })}
            />Other
          </RadioGroup>
          <div style={{ color: "red" }}>
            {errors.gender && <span>gender is required</span>}
          </div>
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
              {...register("city", { required: true })}
              //   value={input.city}
              //   onChange={handleOnchange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <div style={{ color: "red" }}>
            {errors.city && <span> Select the city</span>}
          </div>
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
            >
              Send
            </Button>
            {/* <input type="reset" />  */}
          </Stack>
        </FormControl>
      </form>

      {/* <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box> */}
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
                  <Button variant="outlined" onClick={() => Edit(index)}>Edit</Button>
                </TableCell>
                <TableCell align="center">
                  <Button  variant="outlined" onClick={() => handleDelete(index)} color="error">
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
