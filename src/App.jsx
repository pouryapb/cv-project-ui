import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  createMuiTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  button: {
    height: "100%",
  },
  filesContainer: {
    padding: theme.spacing(2, 0),
  },
  formControl: {
    minWidth: 160,
  },
  selectedFiles: {
    paddingTop: theme.spacing(1),
  },
}));

const formats = [
  "jpg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "eps",
  "WebP",
  "pdf",
  "txt",
];

function App() {
  const classes = useStyles();
  const [format, setFormat] = useState("jpg");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (event) => {
    setFormat(event.target.value);
  };

  const handleFileSelected = (event) => {
    const files = Array.from(event.target.files);
    // console.log("files:", files);
    setSelectedFiles(files);
  };

  const download = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleConvert = (event) => {
    const formdata = new FormData();
    formdata.append("image", selectedFiles[0]);
    formdata.append("format", format);

    setIsLoading(true);
    fetch("https://image-format-converter.herokuapp.com/convert", {
      method: "POST",
      body: formdata,
    })
      .then((res) => {
        // console.log(res);
        res.blob().then((blob) => download(blob, `result.${format}`));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={6} md="auto">
              <Button
                className={classes.button}
                startIcon={<CloudUpload />}
                variant="contained"
                color="secondary"
                component="label"
              >
                Load Image
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  // multiple
                  onChange={handleFileSelected}
                />
              </Button>
            </Grid>
            <Grid item xs={6} md="auto">
              <FormControl
                variant="outlined"
                color="secondary"
                className={classes.formControl}
              >
                <InputLabel id="format-select-label">
                  Destination format
                </InputLabel>
                <Select
                  labelId="format-select-label"
                  id="format-select-label"
                  value={format}
                  onChange={handleSelect}
                  label="Destination format"
                >
                  {formats.map((format, index) => (
                    <MenuItem key={"formats-" + index} value={format}>
                      {format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md="auto">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleConvert}
                disabled={selectedFiles.length === 0 || isLoading}
              >
                Convert
              </Button>
            </Grid>
            {isLoading && (
              <Grid item xs={12} md="auto">
                <CircularProgress color="secondary" />
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography color="error" variant="caption">
                *Not working correctly with IDM (disable extention)
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.filesContainer}>
            {selectedFiles.map((file, index) => {
              return (
                <Typography
                  key={"files-" + index}
                  className={classes.selectedFiles}
                >
                  {file.name}
                </Typography>
              );
            })}
          </div>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
