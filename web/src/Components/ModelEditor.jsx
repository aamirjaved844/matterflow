import React from "react";
import { Divider, TextInput, Select, SelectItem } from "@tremor/react";
import { useState, useEffect } from "react";
import * as API from "../API";
import { Button } from "antd";

const ModelEditor = (params) => {
  const fieldDatatypeOptions = [
    "String",
    "Number",
    "Boolean",
    "Object",
    "Timestamp",
  ];

  const [inputFields, setInputFields] = useState([
    { fieldName: "", fieldDatatype: "Object", fieldNameError: "" },
  ]);

  const model_id = params?.model_id;
  let hasModelId = false;

  if (model_id != undefined) {
    //only fetch data if we have a model id
    const init = () => {
      API.getModel(model_id)
        .then((res) => {
          console.log(res.data.json_data);
          var json_data = JSON.parse(res.data.json_data.replace(/'/g, '"'));
          if (json_data.length === 0 || Object.keys(json_data).length === 0) {
            json_data = [
              { fieldName: "", fieldDatatype: "Object", fieldNameError: "" },
            ];
          }
          setInputFields(json_data);
        })
        .catch((err) => console.log(err));
    };
    useEffect(() => {
      init();
    }, []);
    hasModelId = true;
  }

  const handleClose = (handleCloseHandler) => {
    //close the modal now
    handleCloseHandler();
  };

  const handleChangeInput = (index, event) => {
    const exists = inputFields.find((p) => p.fieldName === event.target.value);

    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    if (exists) {
      values[index]["fieldNameError"] = "Field name already in use!";
    } else {
      values[index]["fieldNameError"] = "";
    }

    setInputFields(values);
  };

  const handleSelectChangeInput = (index, value) => {
    console.log("handleSelectChangeInput");
    console.log(index);
    console.log(value);
    const values = [...inputFields];
    values[index]["fieldDatatype"] = value;
    setInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var emptyFieldNames = Object.keys(inputFields).filter((id) => {
      if (inputFields[id].fieldName.length === 0)
        console.log("empty field found!");
      return inputFields[id].fieldName.length === 0;
    });
    if (emptyFieldNames.length > 0) {
      //alert(`Please complete all fieldNames. The Field names not completed are: ${JSON.stringify(emptyFieldNames)}`)
      const values = [...inputFields];
      emptyFieldNames.forEach(function (item, index) {
        console.log(item, index);
        values[parseInt(item)]["fieldNameError"] = "Opps";
      });
      setInputFields(values);
      return;
    }
    var emptyFieldDatatypes = Object.keys(inputFields).filter((id) => {
      if (inputFields[id].fieldDatatype.length === 0)
        console.log("empty fieldDatatype found!");
      return inputFields[id].fieldDatatype.length === 0;
    });
    if (emptyFieldDatatypes.length > 0) {
      alert(
        `Please complete all fieldDatatype. The Field datatypes not completed are: ${JSON.stringify(
          emptyFieldDatatypes
        )}`
      );
      return;
    }

    const inputs = {
      json_data: inputFields,
    };

    if (hasModelId) {
      //we have an id here
      const response = await API.updateModel(model_id, inputs);
      console.log(response);
    } else {
      // Logic to send the form data to the server
      const response = await API.addModel(inputs);
      console.log(response);
    }
    //        navigate("/models");
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { fieldName: "", fieldDatatype: "", fieldNameError: "" },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="ModelEditor">
      <div>
        <h1>Create a Data Model</h1>
        <div className="container mx-auto p-4">
          <form
            onSubmit={(event) => {
              handleSubmit(event);
              handleClose(params.handleClose);
            }}
            className="space-y-4"
          >
            {inputFields.map((inputField, index) => (
              <div key={index} className="flex items-center space-x-2">
                <TextInput
                  name="fieldName"
                  placeholder="Field Name"
                  value={inputField.fieldName}
                  onChange={(event) => handleChangeInput(index, event)}
                  error={inputField.fieldNameError.length > 0}
                  errorMessage={inputField.fieldNameError}
                  className="form-input px-4 py-2 rounded border"
                />

                <Select
                  name="fieldDatatype"
                  placeholder="Field Data Type"
                  value={inputField.fieldDatatype}
                  onValueChange={(value) =>
                    handleSelectChangeInput(index, value)
                  }
                  className="form-input px-4 py-2 rounded border"
                >
                  {fieldDatatypeOptions.map((fieldDatatype, selectIndex) => (
                    <SelectItem key={selectIndex} value={fieldDatatype}>
                      {fieldDatatype}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  danger
                  shape="circle"
                  type="primary"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </Button>
                <Button
                  shape="circle"
                  type="primary"
                  onClick={() => handleAddFields()}
                >
                  +
                </Button>
              </div>
            ))}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModelEditor;
