import { useState } from "react"

export const useForm = (estadoInicial = {}) => {
  const [valores, setValores] = useState(estadoInicial);


  const gestionarInput = ({ target }) => {
    setValores({
      ...valores,
      [target.name]: target.value
    })
  };

  const reset = () => {
    setValores(estadoInicial)
  };

  return [valores, gestionarInput, reset];
}