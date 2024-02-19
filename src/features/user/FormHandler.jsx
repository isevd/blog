import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import UserFormField from '../../components/UserFormField/UserFormField'
import UserFormAgreement from '../../components/UserFormAgreement/UserFormAgreement'
import UserFormBtn from '../../components/UserFormBtn/UserFormBtn'
import validationRulesMaker from '../../helpers/validationRulesMaker'

import { fetchServiceUser, errorReset } from '../../store/userSlice'

const FormHandler = ({ formSet }) => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(errorReset())
  }, [dispatch])

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({ mode: 'onTouched' })

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = (data) => {
    const dataForm = {
      method: formSet.method,
      resource: formSet.resource,
      user: data,
      callback: () => {
        navigate('/')
      },
    }
    dispatch(fetchServiceUser(dataForm))
  }

  const validationRules = validationRulesMaker(watch)

  const fieldsArr = formSet.fields.map((field) => {
    const { title, id, type } = field
    const validation = register(id, validationRules[id])
    return (
      <UserFormField
        key={id}
        title={title}
        id={id}
        type={type}
        validation={validation}
        error={errors[id]}
      />
    )
  })

  const agreement = (
    <Controller
      name="agreement"
      control={control}
      render={(field) => (
        <UserFormAgreement
          field={field}
          errorMessage={errors?.agreement?.message}
        />
      )}
      rules={{ required: 'Confirm agreement' }}
      defaultValue
    />
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {fieldsArr}
        {formSet.agreement && agreement}
        <UserFormBtn title={formSet.button} isValid={isValid} />
      </form>
    </div>
  )
}

export default FormHandler
