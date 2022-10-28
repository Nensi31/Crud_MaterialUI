
import * as React from 'react';
import "./App.css";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';



const validation = (key, value) => {
  switch (key) {
    case "uname":
      if (!value) {
        return ("enter username")
      }
      else {
        return ""
      }
    case "email":
      if (!value) {
        return ("enter email")
      }
      else {
        return ""
      }
    case "pswd":
      if (!value) {
        return ("enter password")
      }
      else {
        return ""
      }
    case "gender":
      if (!value) {
        return ("select the gender")
      }
      else {
        return ""
      }
    case "selected":
      if (!value) {
        return ("select city")
      }
      else {
        return ("")
      }
  }
};

const perPage = 5;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "fit-content",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Form() {
  // const navigate = useNavigate();
  const [input, setInput] = useState({
    uname: "",
    email: "",
    pswd: "",
    gender: "",
    selected: "",
  });
  const [isEdit, setIsEdit] = useState(-1);
  // const [srchuname, setSrchuname] = useState("");
  // const [srchemail, setSrchemail] = useState("");
  // const [srchcity, setSrchcity] = useState("");

  const [search, setSearch] = useState({});
  const [add, setAdd] = useState({});
  const [isadd, setIsadd] = useState(false);
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );

  const [currentPage, setCurrentPage] = useState((0))
  
  const deleteRecord = (index) => {
    data.splice(index, 1);
    setData([...data]);
  };
  const [iseditall, setIseditall] = useState(false);
  const [issaved, setIssaved] = useState(false);
  const [saveddata, setSaveddata] = useState(
    JSON.parse(localStorage.getItem("saveddata")) || []
  );
  const [isvalid, setIsvalid] = useState(false);

  const [error, setError] = useState({
    uname: "",
    pswd: "",
    email: "",
    selected: "",
    gender: "",
  });


  // console.log(data);
  const [duplicate, setDuplicate] = useState(JSON.parse(localStorage.getItem("data")));



  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleSubmit = () => {
    //  console.log("submitted");
    if (!input["uname"]) {
      setError({ ...error, uname: "enter username" });
      return;
    } else if (!input["email"]) {
      setError({ ...error, email: "enter the Email" });
      return;
    } else if (!input["pswd"]) {
      setError({ ...error, pswd: "enter the password" });
      return;
    } else if (!input["gender"]) {
      setError({ ...error, gender: "please select the gender" });
      return;
    } else if (!input["selected"]) {
      setError({ ...error, selected: "please select the city" });
      return;
    } else {
      setError({});
    }

    if (isEdit === -1) {
      const info = input;
      setData([...data, info]);
      setDuplicate([...data, info]);
      localStorage.setItem("data", JSON.stringify([...data, info]))
    }

    clearState();
  };

  const clearState = () => {
    setInput({
      uname: "",
      pswd: "",
      gender: "",
      selected: "",
      email: "",
    });
  };

  const handleOnchange = (e) => {
    const value = e.target.value;
    setInput({ ...input, [e.target.name]: value });
    //console.log(value)
  };

  const searchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  }
  const handleSearch = () => {
    let list = duplicate;
    if (search.unamefilter) {
      list = list.filter((value) =>
        value.uname.toLowerCase().includes(search.unamefilter.toLowerCase())
      );
    }
    if (search.emailfilter) {
      list = list.filter((value) =>
        value.email.toLowerCase().includes(search.emailfilter.toLowerCase())
      );
    }
    if (search.cityfilter) {
      list = list.filter((value) =>
        value.selected.toLowerCase().includes(search.cityfilter.toLowerCase())
      );
    }
    setData(list);
  }

  const editalll = () => {
    setIseditall(true);
    // console.log(iseditall);
  };

  const inputChange = (e, index) => {
    const updt = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setSaveddata(updt);
    localStorage.setItem("saveddata", JSON.stringify(saveddata));
    setData(updt);
  };

  const saveall = () => {
    const updated2 = saveddata.map((item) => {
      const errors = {}
      Object.keys(item).forEach((key) => {
        const err = validation(key, item[key])
        if (err) {
          return errors[key] = err
        }
      })

      item.errors = errors;
      return item
    })
    setSaveddata(updated2);
    setData(saveddata)

    if (updated2.some(values => Object.keys(values.errors).length)) {
      return
    } else {
      localStorage.setItem("data", JSON.stringify(saveddata));
      setData(saveddata);
      setIseditall(false);
    }
  };

  // const sortdata = (sortKey) => {
  //   debugger
  //   console.log("...");
  //   const sortlist = duplicate;
  // sortlist.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
  //   setData(sortlist);
  //   setData([...duplicate])
  // }


  const sortdata = (e) => {

    const { name } = e.target;
    console.log(e.target.name)
    if (name === "uname") {
      console.log("..."); const sortlist = data.sort((a, b) => a.uname.toLowerCase() < b.uname.toLowerCase() ? -1 : 1);
      setData([...sortlist]);
      console.log(data)
    }
    else if (name === "email") {
      const sortlist = data.sort((a, b) => a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1);
      setData([...sortlist]);
    }
    else if (name === "pswd") {
      const sortlist = data.sort((a, b) => a.pswd.toLowerCase() < b.pswd.toLowerCase() ? -1 : 1);
      setData([...sortlist]);
    }
    else if (name === "gender") {
      const sortlist = data.sort((a, b) => a.gender.toLowerCase() < b.gender.toLowerCase() ? -1 : 1);
      setData([...sortlist]);
    }
    else if (name === 'selected') {
      const sortlist = data.sort((a, b) => a.selected.toLowerCase() < b.selected.toLowerCase() ? -1 : 1);
      setData([...sortlist]);
    }
  }
  const onRecordchange = (e) => {
    const { name, value } = e.target;
    setAdd({ ...add, [name]: value })
  }

  const savercrd = () => {
    if (!input["uname"]) {
      setError({ ...error, uname: "enter username" });
      return;
    } else if (!input["email"]) {
      setError({ ...error, email: "enter the Email" });
      return;
    } else if (!input["pswd"]) {
      setError({ ...error, pswd: "enter the password" });
      return;
    } else if (!input["gender"]) {
      setError({ ...error, gender: "please select the gender" });
      return;
    } else if (!input["selected"]) {
      setError({ ...error, selected: "please select the city" });
      return;
    } else {
      setError({});
    }


    const info = input;
    setData([...data, info]);
    setDuplicate([...data, info]);
    localStorage.setItem("data", JSON.stringify([...data, info]))

    setIsadd(false);
    clearState();
  };


  function handlePageChange({ selected: selectedPage }) {
    setCurrentPage(selectedPage)
  }



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); setIsadd(!isadd) }
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="App">
        <h1>Form</h1>
        <div className="form">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', display: "inline-block" },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="row">
              <FormLabel htmlFor="uname" className="label">
                Username
              </FormLabel>
              <TextField id="uname"
                type="text"
                label="Username"
                variant="outlined"
                className="input"
                value={input.uname}
                onChange={handleOnchange}
                name="uname"
              />
            </div>


            <p style={{ color: "red" }}>{error.uname}</p>


            <div className="row">
              <FormLabel htmlFor="email" className="label">
                Email
              </FormLabel>
              <TextField id="email"
                type="email"
                label="email"
                variant="outlined"
                name="email"
                value={input.email}
                onChange={handleOnchange}
                className="input"
              />
            </div>
            <p style={{ color: "red" }}>{error.email}</p>

            <div className="row">
              <FormLabel htmlFor="pswd" className="label">
                Password
              </FormLabel>
              <TextField id="pswd"
                type="password"
                label="password"
                variant="outlined"
                className="input"
                name="pswd"
                value={input.pswd}
                onChange={handleOnchange}
              />
            </div>
            <p style={{ color: "red" }}>{error.pswd}</p>

            <div className="row">
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" htmlFor="gender" className="label">
                  Gender:
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    type="radio"
                    value={"Male"}
                    label="Male"
                    control={<Radio />}
                    className="input"
                    name="gender"
                    id="Male"
                    checked={input.gender === "Male"}
                    onChange={handleOnchange}
                  />


                  <FormControlLabel
                    aria-labelledby="demo-radio-buttons-group-label"

                    value={"Female"}
                    label="Female"
                    className="input"
                    control={<Radio />}
                    name="gender"
                    id="Female"
                    checked={input.gender === "Female"}
                    onChange={handleOnchange}
                  />

                </RadioGroup>
              </FormControl>
            </div>
            <p style={{ color: "red" }}>{error.gender}</p>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="selected"
                  value={input.selected}
                  label="City"

                  name="selected"
                  onChange={handleOnchange}
                >
                  {/* {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))} */}
                  <MenuItem value={"Choose an option"}>--Choose an option</MenuItem>
                  <MenuItem value={"Rajkot"}>Rajkot</MenuItem>
                  <MenuItem value={"Surat"}>Surat</MenuItem>
                  <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
                  <MenuItem value={"Baroda"}>Baroda</MenuItem>
                </Select>

              </FormControl>
            </Box>
            <p style={{ color: "red" }}>{error.selected}</p>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" endIcon={<SendIcon />} className="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
          </Box>
        </div>

        <div className="row_table">
          <h1>Table data</h1>
          <ButtonGroup className="button-group" disableElevation variant="contained">
            <Button className="editall" onClick={editalll}>
              EditAll
            </Button>
            <Button className="save" onClick={saveall}>
              Save
            </Button>
          </ButtonGroup>

          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', marginTop: "40px" },
            }}
            noValidate
            autoComplete="off"
          >

            <TextField type="text" variant="filled" name="unamefilter" onChange={searchChange} />
            <TextField type="text" variant="filled" name="emailfilter" onChange={searchChange} />
            <TextField type="text" variant="filled" name="cityfilter" onChange={searchChange} /></Box>
          <div className="filter_div">
            <Button variant="contained" className="filter" color="success" endIcon={<SearchIcon />} onClick={handleSearch}>Search</Button>

            <Button className="addrcrd" variant="outlined" endIcon={<AddCircleOutlineIcon />} onClick={handleOpen}>Add_Reccord</Button>
          </div>




          {iseditall ? (
            <Paper sx={{ width: '100%' }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="center">Username</StyledTableCell>
                      <StyledTableCell align="center">Email</StyledTableCell>
                      <StyledTableCell align="center">password</StyledTableCell>
                      <StyledTableCell align="center">gender</StyledTableCell>
                      <StyledTableCell align="center">City</StyledTableCell>
                      <StyledTableCell align="center">Action</StyledTableCell>
                      {/* <StyledTableCell>Action</StyledTableCell> */}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          <TextField

                            variant="filled"
                            type="text"
                            name="uname"
                            onChange={(e) => inputChange(e, index)}
                            value={item.uname}
                          />
                          <p style={{ color: "red" }}>{item.errors?.uname || ''}</p>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <TextField

                            variant="filled"
                            name="email"
                            type="text"
                            onChange={(e) => inputChange(e, index)}
                            value={item.email}
                          />
                          <p style={{ color: "red" }}>{item.errors?.email || ''}</p>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <TextField

                            variant="filled"
                            name="pswd"
                            type="text"
                            onChange={(e) => inputChange(e, index)}
                            value={item.pswd}
                          />
                          <p style={{ color: "red" }}>{item.errors?.pswd || ''}</p>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <TextField
                            variant="filled"
                            name="gender"
                            type="text"
                            onChange={(e) => inputChange(e, index)}
                            value={item.gender}
                          />
                          <p style={{ color: "red" }}>{item.errors?.gender || ''}</p>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField

                            variant="filled"
                            name="selected"
                            type="text"
                            onChange={(e) => inputChange(e, index)}
                            value={item.selected}
                          />
                          <p style={{ color: "red" }}>{item.errors?.selected || ''}</p>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          <Button className="delete" variant="outlined" color="error" endIcon={<DeleteIcon />} onClick={deleteRecord}>
                            delete
                          </Button>
                        </StyledTableCell>
                        {/* <StyledTableCell>
                  <Button className="edit" onClick={() => editRecord(index)}>
                    Edit
                  </Button>
                </StyledTableCell> */}
                      </StyledTableRow >
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          ) : (<Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440, marginTop: "40px" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center"><Button name="uname" onClick={sortdata} endIcon={<SortIcon />} variant="outlined" >Username</Button></StyledTableCell>
                    <StyledTableCell align="center"><Button name="email" onClick={(e) => sortdata(e)} endIcon={<SortIcon />} variant="outlined" >Email</Button></StyledTableCell>
                    <StyledTableCell align="center"><Button name="pswd" onClick={(e) => sortdata(e)} endIcon={<SortIcon />} variant="outlined" >password</Button></StyledTableCell>
                    <StyledTableCell align="center"><Button name="gender" onClick={(e) => sortdata(e)} endIcon={<SortIcon />} variant="outlined" >gender</Button></StyledTableCell>
                    <StyledTableCell align="center"><Button name="selected" onClick={(e) => sortdata(e)} endIcon={<SortIcon />} variant="outlined" >City</Button></StyledTableCell>

                    <StyledTableCell align="center"><Button variant="contained" color='success' align="center">Action</Button></StyledTableCell>
                    {/* <StyledTableCell>Action</StyledTableCell> */}
                  </TableRow>


                </TableHead>
                {isadd ?
                  (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}> <TableBody>

                        <TableRow>
                          <StyledTableCell align="center">
                            <FormLabel htmlFor="uname" className="label">
                              ___Username___
                            </FormLabel>
                            <TextField

                              variant="outlined"
                              type="text"
                              id="uname"
                              className="input"
                              value={input.uname}
                              onChange={handleOnchange}
                              name="uname"
                            />
                            <p style={{ color: "red" }}>{error.uname}</p>
                          </StyledTableCell>


                          <StyledTableCell align="center">
                            <FormLabel htmlFor="email" className="label">
                              ____Email____
                            </FormLabel>
                            <TextField

                              variant="outlined"
                              type="text"
                              id="email"
                              className="input"
                              value={input.email}
                              onChange={handleOnchange}
                              name="email"
                            />
                            <p style={{ color: "red" }}>{error.email}</p>
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <FormLabel htmlFor="pswd" className="label">  ___password____
                            </FormLabel>

                            <TextField

                              variant="outlined"
                              type="text"
                              id="pswd"
                              className="input"
                              value={input.pswd}
                              onChange={handleOnchange}
                              name="pswd"
                            />
                            <p style={{ color: "red" }}>{error.pswd}</p>
                          </StyledTableCell>

                          <StyledTableCell align='right'>
                            <FormControl>
                              <FormLabel id="demo-radio-buttons-group-label" htmlFor="gender" className="label">
                                Gender:
                              </FormLabel>
                              <RadioGroup

                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                              >
                                <FormControlLabel
                                  type="radio"
                                  value={"Male"}
                                  label="Male"
                                  control={<Radio />}
                                  className="input"
                                  name="gender"
                                  id="Male"
                                  checked={input.gender === "Male"}
                                  onChange={handleOnchange}
                                />


                                <FormControlLabel
                                  aria-labelledby="demo-radio-buttons-group-label"

                                  value={"Female"}
                                  label="Female"
                                  className="input"
                                  control={<Radio />}
                                  name="gender"
                                  id="Female"
                                  checked={input.gender === "Female"}
                                  onChange={handleOnchange}
                                />

                              </RadioGroup>
                            </FormControl>
                            <p style={{ color: "red" }}>{error.gender}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box sx={{ minWidth: 120 }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="selected"
                                  value={input.selected}
                                  label="City"

                                  name="selected"
                                  onChange={handleOnchange}
                                >
                                  {/* {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))} */}
                                  <MenuItem value={"Choose an option"}>--Choose an option</MenuItem>
                                  <MenuItem value={"Rajkot"}>Rajkot</MenuItem>
                                  <MenuItem value={"Surat"}>Surat</MenuItem>
                                  <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
                                  <MenuItem value={"Baroda"}>Baroda</MenuItem>
                                </Select>

                              </FormControl>
                            </Box>
                            <p style={{ color: "red" }}>{error.selected}</p>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Button variant='contained' onClick={savercrd}>Save_Record</Button>
                          </StyledTableCell>



                        </TableRow>
                      </TableBody></Box>
                    </Modal>

                  ) : (

                    <TableBody>

                      {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                        <TableRow key={index}>
                          <StyledTableCell align="center">{item.uname}</StyledTableCell>

                          <StyledTableCell align="center">{item.email}</StyledTableCell>
                          <StyledTableCell align="center">{item.pswd}</StyledTableCell>
                          <StyledTableCell align="center">{item.gender}</StyledTableCell>
                          <StyledTableCell align="center">{item.selected}</StyledTableCell>
                          <StyledTableCell>
                            <Button align="center" variant="outlined" color="error" endIcon={<DeleteIcon />} className="delete" onClick={deleteRecord}>
                              delete
                            </Button>
                          </StyledTableCell>

                        </TableRow>
                      ))}
                    </TableBody>)}
              </Table>
            </TableContainer>
          </Paper>)
          }
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </div>
    </>
  );
}
