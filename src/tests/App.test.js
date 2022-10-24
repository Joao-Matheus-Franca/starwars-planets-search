import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Table from '../Components/Table';
import { MyContext } from '../Components/MyContext';
import mockContext from './helper'

describe('Testes da aplicação', () => {
  const mockFetch = { results: [
    {
      name: "Tatooine", 
      rotation_period: "23", 
      orbital_period: "304", 
      diameter: "10465", 
      climate: "arid", 
      gravity: "1 standard", 
      terrain: "desert", 
      surface_water: "1", 
      population: "200000",  
      films: [
        "https://swapi.dev/api/films/1/", 
        "https://swapi.dev/api/films/3/", 
        "https://swapi.dev/api/films/4/", 
        "https://swapi.dev/api/films/5/", 
        "https://swapi.dev/api/films/6/"
      ], 
      created: "2014-12-09T13:50:49.641000Z", 
      edited: "2014-12-20T20:58:18.411000Z", 
      url: "https://swapi.dev/api/planets/1/"
    }]};
      
  test('Testando a presença dos elementos no componente Header', () => {
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(mockFetch)
    }));

    render(<App />)

    const title = screen.getByRole('heading', {  name: /star wars/i})
    const nameFilter = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter')
    const buttonRemoveFilter = screen.getByTestId('button-remove-filters')

    expect(title).toBeInTheDocument()
    expect(nameFilter).toBeInTheDocument()
    expect(columnFilter).toBeInTheDocument()
    expect(comparisonFilter).toBeInTheDocument()
    expect(valueFilter).toBeInTheDocument()
    expect(buttonFilter).toBeInTheDocument()
    expect(buttonRemoveFilter).toBeInTheDocument()
  });
  test('Testando a presença dos elementos no componente Table', () => {
    global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }));

    render(
      <MyContext.Provider value={{ planets: mockContext.planets, 
      nameFilter: ' ', filters:  []}}>
        <Table />
      </MyContext.Provider>
      );

    const headerName = screen.getByRole('columnheader', {  name: /name/i})
    const headerRotation = screen.getByRole('columnheader', {  name: /rotation period/i})
    const headerOrbital = screen.getByRole('columnheader', {  name: /orbital period/i})
    const headerDiameter = screen.getByRole('columnheader', {  name: /orbital period/i})
    const headerClimate = screen.getByRole('columnheader', {  name: /climate/i})
    const headerGravity = screen.getByRole('columnheader', {  name: /gravity/i})
    const headerTerrain = screen.getByRole('columnheader', {  name: /terrain/i})
    const headerSurface = screen.getByRole('columnheader', {  name: /surface water/i})
    const headerPopulation = screen.getByRole('columnheader', {  name: /population/i})
    const headerFilms = screen.getByRole('columnheader', {  name: /films/i})
    const headerCreated = screen.getByRole('columnheader', {  name: /created/i})
    const headerEdited = screen.getByRole('columnheader', {  name: /edited/i})
    const headerUrl = screen.getByRole('columnheader', {  name: /url/i})

    expect(headerName).toBeInTheDocument()
    expect(headerRotation).toBeInTheDocument()
    expect(headerOrbital).toBeInTheDocument()
    expect(headerDiameter).toBeInTheDocument()
    expect(headerClimate).toBeInTheDocument()
    expect(headerGravity).toBeInTheDocument()
    expect(headerTerrain).toBeInTheDocument()
    expect(headerSurface).toBeInTheDocument()
    expect(headerPopulation).toBeInTheDocument()
    expect(headerFilms).toBeInTheDocument()
    expect(headerCreated).toBeInTheDocument()
    expect(headerEdited).toBeInTheDocument()
    expect(headerUrl).toBeInTheDocument()
  });
  test('Testando a funcionalidade dos inputs de filtro', () => {
    global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockFetch)
    }));

    render(<App />);

    const nameFilter = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const buttonFilter = screen.getByTestId('button-filter')
    const buttonRemoveFilter = screen.getByTestId('button-remove-filters')

    userEvent.type(nameFilter, 'teste')
    userEvent.selectOptions(columnFilter, 'population')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valueFilter, '0')
    userEvent.click(buttonFilter)

    const filterLine = screen.getByRole('heading', {  name: /population maior que 0/i})
    const clearOneFilter = screen.getByRole('button', {  name: /excluir filtro/i})

    expect(filterLine).toBeInTheDocument()

    userEvent.click(clearOneFilter)
    expect(filterLine).not.toBeInTheDocument()

    userEvent.selectOptions(columnFilter, 'orbital_period')
    userEvent.selectOptions(comparisonFilter, 'maior que')
    userEvent.type(valueFilter, '0')
    userEvent.click(buttonFilter)

    const newFilterLine = screen.getByRole('heading', {  name: /orbital_period maior que 0/i})
    expect(newFilterLine).toBeInTheDocument()

    userEvent.click(buttonRemoveFilter)
    expect(newFilterLine).not.toBeInTheDocument()

  });
  test('Testando a presença dos elementos no componente Table', () => {
    render(
      <MyContext.Provider value={{ planets: mockContext.planets, 
      nameFilter: mockContext.nameFilter, filters: mockContext.filters }}>
        <Table />
      </MyContext.Provider>
      );

    
  })
})

