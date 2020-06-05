/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import DropZone from '../../components/Dropzone';

import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Container, Form } from './styles';

interface Item {
  id: string;
  title: string;
  image_url: string;
}

interface StatesResponse {
  sigla: string;
}

interface CitiesResponse {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>();
  const [states, setStates] = useState<string[]>();
  const [cities, setCities] = useState<string[]>([]);

  const [formData, setFormDate] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectsUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selecetdItems, setSelectedItems] = useState<string[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/items').then(response => setItems(response.data));
  }, []);

  useEffect(() => {
    axios
      .get<StatesResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const initials = response.data.map(state => state.sigla);
        setStates(initials);
      });
  }, []);

  useEffect(() => {
    if (selectsUF === '0') {
      return;
    }

    axios
      .get<CitiesResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectsUF}/municipios`,
      )
      .then(response => {
        const cityName = response.data.map(city => city.nome);

        setCities(cityName);
      });
  }, [selectsUF]);

  const handleSelectUf = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;

      setSelectedUF(uf);
    },
    [],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;

      setSelectedCity(city);
    },
    [],
  );

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setFormDate({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSelectItem = useCallback(
    (id: string) => {
      const alreadySelected = selecetdItems.findIndex(item => item === id);

      if (alreadySelected >= 0) {
        const filteredItems = selecetdItems.filter(item => item !== id);
        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([...selecetdItems, id]);
      }
    },
    [selecetdItems],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        const { name, email, whatsapp } = formData;
        const country = 'Uk';
        const city = 'London';
        // eslint-disable-next-line no-shadow
        const items = selecetdItems;
        const [latitude, longitude] = selectedPosition;

        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('country', country);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));

        if (selectedFile) {
          data.append('image', selectedFile);
        }

        await api.post('/points', data);
        alert('Point Created');
        history.push('/');
      } catch (error) {
        alert(error);
      }
    },
    [formData, selecetdItems, selectedPosition, selectedFile, history],
  );

  const handleAddClass = useCallback(
    (id: string) => {
      return selecetdItems.includes(id) ? 'selected' : '';
    },
    [selecetdItems],
  );

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Go Back
        </Link>
      </header>

      <Form onSubmit={handleSubmit}>
        <h1>
          Registration of
          <br />
          the collection point
        </h1>

        <DropZone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Informations</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on the map</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                value={selectsUF}
                id="country"
                onChange={handleSelectUf}
              >
                <option value="0">Select a country</option>
                {states?.map(state => (
                  <option value={state} key={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option value="0">Select a city</option>
                {cities.map(city => (
                  <option value={city} key={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collection items</h2>
            <span>Select one or more items below</span>
          </legend>

          <ul>
            {items?.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={handleAddClass(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Register</button>
      </Form>
    </Container>
  );
};

export default CreatePoint;
