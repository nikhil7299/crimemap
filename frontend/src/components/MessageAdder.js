import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "../App.css";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import netLine from "../controllers/netLine";
import { MdOutlineClose } from "react-icons/md";
import MaterialInput from "./MaterialInput";
import CustomSelect from "./CustomSelect";
import DropDownInput from "./DropDownInput";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 35vw;
  height: 100px;
  cursor: default;
  width: 30vw;
  z-index: 100000;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 10, 36, 0.9) 0%,
    rgba(9, 9, 11, 0.9) 35%,
    rgba(0, 20, 20, 0.9) 100%
  );
  box-shadow: 1px 1px 50px 1px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  padding: 10px 35px;
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  gap: 25px;
  border-radius: 20px 20px 0 0;
  color: #fff;

  transition: 0.25s ease-in-out;

  ${({ opened }) => {
    if (opened) {
      return `
      
        height:50vh;
        padding: 10px 35px;

      `;
    }
  }}
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1``;

const Input = styled.textarea`
  background-color: rgba(0, 0, 0, 0.1);
  resize: none;
  border-radius: 10px;
  border: none;
  padding: 10px;
  color: #fff;
  font-family: "Raleway";

  &::placeholder {
    color: #fff6;
  }
`;

const Button = styled.div`
  border: 1px solid var(--translucentHard);
  padding: 10px 20px;
  font-size: 15px;
  width: 100px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: var(--translucentHard);
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  background: #111111;
  background: linear-gradient(
    90deg,
    rgba(5, 20, 72, 1) 0%,
    rgba(18, 18, 18, 1) 35%,
    rgba(0, 40, 40, 1) 100%
  );
  backdrop-filter: blur(200px);
  top: -20px;
  right: -20px;
  height: 50px;
  width: 50px;
  font-size: 20px;
  border-radius: 100px;
  transition: 0.25s ease-in-out;

  &:hover {
    transform: scale(0.7);
  }
`;

const crimes = [
  { value: "murder", label: "Murder" },
  { value: "theft", label: "Theft" },
  { value: "fraud", label: "Fraud" },
  { value: "assault", label: "Assault" },
  { value: "burglary", label: "Burglary" },
  { value: "robbery", label: "Robbery" },
  { value: "drug_trafficking", label: "Drug Trafficking" },
  { value: "kidnapping", label: "Kidnapping" },
  { value: "embezzlement", label: "Embezzlement" },
  { value: "arson", label: "Arson" },
  { value: "cybercrime", label: "Cybercrime" },
  { value: "sexual_assault", label: "Sexual Assault" },
  { value: "terrorism", label: "Terrorism" },
  { value: "money_laundering", label: "Money Laundering" },
  { value: "vandalism", label: "Vandalism" },
];

function MessageAdder({ messages, setMessages }) {
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [crimeType, setType] = useState("theft");

  const [findingLocation, setFindingLocation] = useState(false);
  const [opened, setOpened] = useState(false);

  window.messages = messages;
  window.findingLocation = findingLocation;
  window.message = message;
  window.name = name;
  window.phoneNumber = phoneNumber;
  window.crimeType = crimeType;

  useMapEvents({
    click: (e) => {
      if (window.findingLocation) {
        let location = [e.latlng.lat, e.latlng.lng];

        setMessages([
          ...window.messages,
          {
            location,
            message: window.message,
            name: window.name,
            crimeType: window.crimeType,
            phoneNumber: window.phoneNumber,
          },
        ]);

        setMessage("");
        setFindingLocation(false);

        netLine.post(
          `message/?crimeType=${window.crimeType}&name=${
            window.name
          }&phoneNumber=${window.phoneNumber}&message=${
            window.message
          }&location=${JSON.stringify(location)}`
        );
        // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
      }

      // map.locate()
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });

  if (!opened)
    return (
      <Container
        style={{ cursor: "pointer" }}
        onClick={() => {
          setOpened(true);
        }}
      >
        <Title>Report Crime</Title>
      </Container>
    );

  return (
    <Container opened={opened}>
      <Title>Report Crime</Title>

      <InputSection>
        <MaterialInput
          variant="filled"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          placeholder="Type Your Name Here"
        />
        <MaterialInput
          variant="filled"
          value={message}
          onChange={({ target }) => {
            setMessage(target.value);
          }}
          placeholder="Type Your Message Here"
        />
        <MaterialInput
          variant="filled"
          value={phoneNumber}
          type={"number"}
          onChange={({ target }) => {
            setPhoneNumber(target.value);
          }}
          placeholder="Type your phone number Here"
        />

        <DropDownInput
          title="Select Crime Type"
          placeholder="Select Crime Type"
          value={crimeType}
          onChange={setType}
          options={crimes}
        />

        <Buttons>
          <Button onClick={publish}>Publish</Button>
          <CloseButton
            onClick={() => {
              setOpened(false);
            }}
          >
            <MdOutlineClose />
          </CloseButton>
        </Buttons>
      </InputSection>
    </Container>
  );

  function publish() {
    setFindingLocation(true);
    window.doAlert("Please select a location");
  }
}

export default MessageAdder;
