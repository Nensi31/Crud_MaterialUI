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
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

// const pattern= /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

const validationSchema = Yup.object().shape({
  uname: Yup.string()
    .min(2, "Username is too Short!")
    .max(50, "Username is too Long!")
    .required("Username is required"),
  pswd: Yup.string()
    .min(2, " password is too Short!")
    .max(50, " password is too Long!")
    .required("Password is required"),

  gender: Yup.string().required("selecte the gender"),

  city: Yup.string().required("select the city"),
});

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

export default function Crud() {
  const [input, setInput] = React.useState({
    id: 1,
    uname: "",
    pswd: "",
    gender: "",
    city: "",
  });

  const [data, setData] = React.useState(
   
  );

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
    console.log(newrcrd);
    setInput(newrcrd);
    formik.setValues(newrcrd);
    setData([...data, input]);
    setIsEdit(id);
  };

  const handleDelete = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData([...updated]);
  };

  const formik = useFormik({
    initialValues: {
      uname: "",
      pswd: "",
      gender: "",
      city: "",
      isEdit: -1,
      id:uuidv4(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    
      // same shape as initial values

      // console.log(values);
      // setData([...data, values]);

      // console.log(data);
      // localStorage.setItem(
      //   "datagrid",
      //   JSON.stringify([...data, values]) || [])
      if (isEdit === -1) {
        setData([...data, values]);

        console.log([...data, values]);
        localStorage.setItem(
          "datagrid",
          JSON.stringify([...data, values]) || []
        );
      } else {
        const updated = data.map((item, index) => {
          if (index === isEdit) {
            return values;
          }
          return item;
        });
        // formik.setFieldValue({id:uuidv4()})
        setData(updated);
        setIsEdit(-1);
      }
      formik.resetForm();
    },
  });
  // console.log(formik.values)
  return (
    <div className="App">
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <TextField
            className="TextField"
            label="Username"
            name="uname"
            variant="outlined"
            value={formik.values.uname}
            onChange={formik.handleChange}
            error={formik.touched.uname && Boolean(formik.errors.uname)}
            helperText={formik.touched.uname && formik.errors.uname}
          />
          {/* {console.log(errors)}
              {errors.uname && touched.uname ? <div>{errors.uname}</div> : null} */}
          <TextField
            className="TextField"
            label="pswd"
            name="pswd"
            variant="outlined"
            value={formik.values.pswd}
            onChange={formik.handleChange}
            error={formik.touched.pswd && Boolean(formik.errors.pswd)}
            helperText={formik.touched.pswd && formik.errors.pswd}
          />

          <FormLabel component="legend" id="demo-row-radio-buttons-group-label">
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
              onChange={formik.handleChange}
              // checked={input.gender === "female"}
              control={<Radio />}
              label="Female"
              // error={formik.touched.gender&& Boolean(formik.errors.gender)}
              // helperText={formik.touched.gender&& formik.errors.gender}
            />
            <FormControlLabel
              value="male"
              name="gender"
              onChange={formik.handleChange}
              // checked={input.gender === "male"}
              control={<Radio />}
              label="Male"
              // error={formik.touched.gender && Boolean(formik.errors.gender)}
              // helperText={formik.touched.gender && formik.errors.gender}
            />
            <FormControlLabel
              value="other"
              name="gender"
              onChange={formik.handleChange}
              // checked={input.gender === "other"}
              control={<Radio />}
              label="Other"
              // error={formik.touched.gender&& Boolean(formik.errors.gender)}
              // helperText={formik.touched.gender && formik.errors.gender}
            />
          </RadioGroup>
          <div style={{ color: "red" }}>{formik.errors.gender}</div>

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
              value={formik.values.city}
              onChange={formik.handleChange}
              className="TextField"
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            >
              <div>{formik.errors.city}</div>
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              fullWidth
            >
              Send
            </Button>
          </Stack>
        </FormControl>
      </form>

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
