import { useState,ChangeEvent, FormEvent } from 'react';
import type { SearchType } from '../../types';
import { countries } from '../../data/countries';
import Alert from '../Alerta/Alert';
import styles from "./Form.module.css";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}

const Form = ({fetchWeather}: FormProps) => {

    const [search,setSearch] = useState<SearchType>({
        city:"",
        country:""
    })

    const [alert,setAlert] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>  |  ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(Object.values(search).includes("")){
            setAlert("Todos los campos son obligatorios");
            return
        }
        fetchWeather(search);
        setAlert("");
    }



  return (
    <form className={styles.form} onSubmit={handleSubmit}>

        {alert &&<Alert>{alert}</Alert>}

        <div className={styles.field}>
            <label htmlFor="city">Cuidad:</label>
            <input type="text" id="city" name="city" placeholder='Ciudad' value={search.city} onChange={handleChange} />
        </div>


        <div className={styles.field}>
            <label htmlFor="country">País:</label>
            <select name="country" id="country" value={search.country} onChange={handleChange}>
                <option value="">-- Seleccione --</option>
                {countries.map(country => (
                    <option key={country.code} value={country.code} className={styles.textBlack}>{country.name}</option>
                ))}
            </select>
        </div>

        <input className={styles.submit} type="submit" value={'Consultar Clima'} />

    </form>
  )
}

export default Form
