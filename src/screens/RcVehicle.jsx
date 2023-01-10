import { useEffect, useState } from "react";
import {
  getVehicleModels,
  getFormData,
  getMunicipalities,
  getVehicleBrands,
  getVehicleVersions,
  getNewQuote,
} from "../api";
import InputText from "../common/components/inputs/InputText";
import InputDate from "../common/components/inputs/InputDate";
import InputRadio from "../common/components/inputs/InputRadio";
import InputSelect from "../common/components/inputs/InputSelect";
import InputSelectWithSearch from "../common/components/inputs/InputSelectWithSearch";
import InputSelectTable from "../common/components/inputs/InputTable";
import LoadingGif from "../assets/images/loading.gif";
import InputPrivacy from "../common/components/inputs/InputPrivacy";
import ProgressBar from "../common/components/ProgressBar";
import InputAddress from "../common/components/inputs/InputAddress";
import {
  validateCarPlate,
  validateItalianPostCode,
  validateVatNumber,
} from "../common/validators";
import {
  genders,
  flagResponse,
  months,
  years,
  km_during_one_year,
  vehiclesAmountInFamily,
  meritClass,
  companyTypes,
  guideType,
  lastSixYears,
  insuranceTypes,
} from "../common/constants";
import { useNavigate, useParams } from "react-router-dom";
import convertToItalianDate from "../common/helpers/convertToItalianDate";
import PageLoading from "../common/components/elements/PageLoading";
import InputBirthPlace from "../common/components/inputs/InputBirthPlace";
import getMaxAllowedBirthday from "../common/helpers/getMaxAllowedBirthday";
import appStorage from "../common/helpers/appStorage";
import rcVehicleValidator from "../common/validators/form/rcVehicleValidator";
import getAllowedPolicyEffectDate from "../common/helpers/getAllowedPolicyEffectDate";
import generateFiscalCode from "../common/helpers/generateFiscalCode";
import getAllowedLicenseYears from "../common/helpers/getAllowedLicenseYears";
import getAllowedPurchaseYears from "../common/helpers/getAllowedPurchaseYears";
import InputViolations, {
  calculateDetails,
} from "../common/components/inputs/InputViolations";
import Modal from "../common/components/elements/Modal";

const Storage = appStorage();

export default function RcVehicle() {
  const navigate = useNavigate();
  let { vehicle } = useParams();
  const StoredAnswers = Storage.getVehicleQuoteAnswers();

  // Constants
  const steps = [
    "Dati Personali",
    "Dati del Veicolo",
    "Dati Assicurativi",
    "Calcolare",
  ];
  // STATE
  const [index, setIndex] = useState(1);
  const [title, setTitle] = useState("");
  const [municipalities, setMunicipalities] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    qualifications: [],
    professions: [],
    parking_types: [],
    theft_protections: [],
    marital_statuses: [],
    insurance_companies: [],
  });
  const [vehicleVersions, setVehicleVersions] = useState([]);
  const [answers, setAnswers] = useState(
    StoredAnswers
      ? StoredAnswers
      : {
          product: vehicle,
          source: "meglioquestio.it",
          contractor_is_owner: "",
          contractor_is_driver: "",
          name: "",
          surname: "",
          gender: "",
          fiscal_code: "", //missing ( autogenerate )
          phone: "",
          email: "",
          date_of_birth: "",
          country_of_birth_code: "A000", // missing
          province_of_birth_code: "",
          commune_of_birth_code: "",
          born_abroad: 0,
          residence_province_code: "",
          residence_commune_code: "",
          postal_code: "",
          address: null,
          house_number: null,
          civil_status_id: "",
          education_level_id: "",
          profession_id: "",
          driving_license_year: "",
          vehicle_plate: "",
          vehicle_brand_code: "",
          vehicle_model_code: "",
          vehicle_version_code: "",
          imm_vehicle_year: "",
          imm_vehicle_month: "",
          vehicle_year: "",
          vehicle_month: "",
          vehicle_purchased_year: "",
          theft_protection_code: "",
          tow_hook: "",

          children: "",
          youngest_age: "",
          vehicle_parking: "",
          other_power_supply: "",
          vehicle_usage: "",
          predicted_km: "",
          vehicles_owned: "",
          policy_effective_date: "",
          other_drivers: "",
          youngest_age_driver: "",
          youngest_age_family_member: "",
          mofified_vehicle: "",
          valid_driving_license: "",
          first_insuranced_year: "",
          violations: "",
          violations_data: "",
          violations_number: "",
          business_name: "",
          vat_number: "",
          company_type: "",
          guide_type: "",
          insurance_type: "",
          // PRIVACY TO DO...
        }
  );

  // STATE - LOADING
  const [isLaoding, setIsLoading] = useState(true);
  const [isLoadingVehicleModels, setIsLoadingVehicleModels] = useState(false);
  const [IsLoadingVehicleVersions, setIsLoadingVehicleVersions] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  // FUNCTIONS
  const submitAnswers = () => {
    setIsSubmitting(true);

    let answersData = { ...answers };

    answersData.date_of_birth = convertToItalianDate(answers.date_of_birth);
    answersData.policy_effective_date = convertToItalianDate(
      answers.policy_effective_date
    );
    answersData.fiscal_code = getFiscalCode();
    answersData.violations === "" || !answersData.violations
      ? (answersData.violations_data = calculateDetails(
          answers.first_insuranced_year
        ))
      : console.log("default");

    // console.log(answersData);

    getNewQuote(answersData).then((res) => {
      setIsSubmitting(false);
      if (res.request_token) {
        localStorage.setItem("UI_request", JSON.stringify(answersData));
        localStorage.setItem("SE_response", JSON.stringify(res));
        navigate(`/quotes/${res.request_token}`);
      } else {
        Alert("Something Went Wrong. Please call system administrator");
      }
    });
  };

  const updateFormData = (answer) => {
    setAnswers({ ...answers, ...answer });
  };

  const prevButton = () => {
    if (index > 1) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextButton = () => {
    const { error, message } = rcVehicleValidator({ answers, index });
    if (!error) {
      if (index === 4) {
        submitAnswers();
        return;
      }
      setIndex((prevIndex) => prevIndex + 1);
      setTimeout(() => window.scrollTo(0, 0), 500);
      return;
    } else {
      Alert(message);
    }
  };

  const getFiscalCode = () => {
    let d = answers.date_of_birth.split("-");
    let fData = {
      name: answers.name,
      surname: answers.surname,
      gender: answers.gender,
      day: d[2],
      month: d[1],
      year: d[0],
      birthplace: municipalities.filter(
        (municipality) =>
          municipality.cadastral_code === answers.commune_of_birth_code
      )[0]?.name,
      birthplaceProvincia: answers.province_of_birth_code,
    };
    return generateFiscalCode(fData);
  };
  // ALERTS

  const Alert = (message) => {
    setError({ error: true, message: message });
    setShowModal(true);
  };
  // HOOKS
  useEffect(() => {
    const checkIfFormDataIsRetrived = () => {
      let isRetrived = true;
      if (!municipalities.length) isRetrived = false;
      if (!brands.length) isRetrived = false;
      if (!formData.marital_statuses.length) isRetrived = false;
      setIsLoading(!isRetrived);
    };
    checkIfFormDataIsRetrived();
  }, [municipalities, brands, formData]);

  useEffect(() => {
    const loadFormData = async () => {
      setIsLoading(true);
      getMunicipalities().then((res) => {
        console.log(res, "munis");
        setMunicipalities(res?.data ?? []);
      });
      getVehicleBrands().then((res) => {
        console.log(res, "vehicle brand");
        setBrands(res?.data ?? []);
      });
      getFormData().then((res) => {
        console.log(res, "form data");
        setFormData(res?.data ?? []);
      });
    };
    loadFormData();
  }, [vehicle]);

  useEffect(() => {
    switch (index) {
      case 1:
        setTitle("Dati Personali");
        break;
      case 2:
        setTitle("Dati del Veicolo");
        break;
      case 3:
        setTitle("Dati Assicurativi");
        break;
      case 4:
        setTitle("Calcolare");
        break;
      default:
        setTitle("");
        break;
    }
  }, [index]);

  useEffect(() => {
    Storage.setVehicleQuoteAnswers(answers);
  }, [answers]);

  useEffect(() => {
    if (answers.vehicle_brand_code) {
      setIsLoadingVehicleModels(true);
      getVehicleModels({ make_id: answers.vehicle_brand_code }).then((res) => {
        setVehicleModels(res.data);
        setIsLoadingVehicleModels(false);
      });
    }
  }, [answers.vehicle_brand_code]);

  useEffect(() => {
    if (answers.vehicle_model_code) {
      setIsLoadingVehicleVersions(true);
      getVehicleVersions({
        model_id: answers.vehicle_model_code,
        year: answers.vehicle_year,
        month: answers.vehicle_month,
      }).then((res) => {
        console.log(res.data);
        setVehicleVersions(res.data);
        setIsLoadingVehicleVersions(false);
      });
    }
  }, [answers.vehicle_model_code, answers.vehicle_month, answers.vehicle_year]);

  if (isLaoding) {
    return <PageLoading />;
  }

  return (
    <>
      {error !== null && showModal && (
        <Modal
          message={error.message}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}
      <div className="d-flex align-content-center">
        <ProgressBar activeStep={index} steps={steps} />
      </div>
      <div>
        {console.log(
          answers.commune_of_birth_code,
          answers.province_of_birth_code,
          answers.born_abroad
        )}
        {isSubmitting && (
          <div className="stopInteraction">
            <div className="black-cover"></div>
            <span>
              <div className="text-center">
                <img
                  className="loading-gif"
                  src={LoadingGif}
                  alt=":aoding indicator"
                />
                <br />
                Attendere prego
              </div>
            </span>
          </div>
        )}
        <div className=" row title-questionnaire">
          <div className="quote-h2 divider">
            <h2>{title}</h2>
          </div>
        </div>
        {index === 1 && (
          <div className="form-group" id="index-1">
            <InputRadio
              title="Il contraente è"
              options={genders}
              name="gender"
              onChange={(value) => updateFormData({ gender: value })}
              value={answers.gender}
            />
            <InputDate
              label="Data di nascita"
              id="date_of_birth"
              onChange={(value) => updateFormData({ date_of_birth: value })}
              value={answers.date_of_birth}
              minDate="1922-01-01"
              maxDate={getMaxAllowedBirthday()}
            />
            <InputBirthPlace
              label="Luogo di nascita"
              id="commune_of_birth_code"
              value={{
                commune_of_birth_code: answers.commune_of_birth_code,
                province_of_birth_code: answers.province_of_birth_code,
                born_abroad: answers.born_abroad,
              }}
              onChange={(item) =>
                updateFormData({
                  commune_of_birth_code: item.cadastral_code,
                  province_of_birth_code:
                    item.communal_territory.car_plate_symbol,
                  born_abroad: item.born_abroad,
                })
              }
              options={municipalities}
            />
            <InputAddress
              valueAddress={answers.address}
              valueHouse={answers.house_number}
              placeholder="Indirizzo"
              label="Indirizzo"
              onAddressChange={(value) => updateFormData({ address: value })}
              onHouseNumberChange={(value) =>
                updateFormData({ house_number: value })
              }
            />
            <InputSelectWithSearch
              value={{
                residence_commune_code: answers.residence_commune_code,
                residence_province_code: answers.residence_province_code,
              }}
              placeholder="Comune"
              label="Residenza"
              name="residence_commune_code"
              onChange={(item) =>
                updateFormData({
                  residence_commune_code: item.cadastral_code,
                  residence_province_code:
                    item.communal_territory.car_plate_symbol,
                })
              }
              options={municipalities}
              returnType={"object"}
              countryCode="cadastral_code"
            >
              <InputText
                validator={validateItalianPostCode}
                type="number"
                placeholder="-Codice Postale-"
                name="postal_code"
                id="postal_code"
                nostyle={1}
                onChange={(value) => updateFormData({ postal_code: value })}
                value={answers.postal_code}
              />
            </InputSelectWithSearch>
            <InputRadio
              title="Figli conviventi?"
              id="prove"
              options={flagResponse}
              name="children"
              onChange={(value) => updateFormData({ children: value })}
              value={answers.children}
            />
            <InputSelect
              placeholder="Stato civile"
              label="Stato civile"
              name="civil_status_id"
              id="marital"
              options={formData.marital_statuses}
              onChange={(value) => updateFormData({ civil_status_id: value })}
              value={answers.civil_status_id}
            />
            <InputSelect
              placeholder="Titolo di studio"
              label="Titolo di studio"
              name="education_level_id"
              id="educational"
              options={formData.qualifications}
              onChange={(value) =>
                updateFormData({ education_level_id: value })
              }
              value={answers.education_level_id}
            />
            <InputSelect
              placeholder="Professione"
              label="Professione"
              name="profession_id"
              id="profession"
              options={formData.professions}
              onChange={(value) => updateFormData({ profession_id: value })}
              value={answers.profession_id}
            />
            <InputRadio
              title="Il contraente è anche il conducente abituale del veicolo?"
              options={flagResponse}
              name="contractor_is_driver"
              onChange={(value) =>
                updateFormData({ contractor_is_driver: value })
              }
              value={answers.contractor_is_driver}
            />
            <InputRadio
              title="Il contraente è anche proprietario dell auto?"
              options={flagResponse}
              name="contractor_is_owner"
              onChange={(value) =>
                updateFormData({ contractor_is_owner: value })
              }
              value={answers.contractor_is_owner}
            />
          </div>
        )}
        {index === 2 && (
          <div className="form-group" id="index-2">
            <InputText
              id="vehicle_plate"
              validator={validateCarPlate}
              name="vehicle_plate"
              label="Targa dell auto"
              pattern="/^[A-Z]{2}[0-9]{3}[A-Z]{2} *$/"
              onChange={(value) =>
                updateFormData({ vehicle_plate: value.toUpperCase() })
              }
              className="uppercase"
              value={answers.vehicle_plate}
            />
            <InputSelect
              label="Anno e mese del veicolo"
              name="vehicle_month"
              id="month"
              placeholder="-Mese-"
              options={months}
              onChange={(value) => updateFormData({ vehicle_month: value })}
              value={answers.vehicle_month}
            >
              <InputSelect
                label="Anno del veicolo"
                name="vehicle_year"
                id="year"
                placeholder="-Anno-"
                options={years}
                nostyle={1}
                onChange={(value) => updateFormData({ vehicle_year: value })}
                value={answers.vehicle_year}
              />
            </InputSelect>

            {answers.vehicle_month && answers.vehicle_year ? (
              <>
                <InputSelectWithSearch
                  placeholder="Marca"
                  label="Marca"
                  name="vehicle_brand_code"
                  id="brand"
                  options={brands}
                  onChange={(value) =>
                    updateFormData({ vehicle_brand_code: value })
                  }
                  value={answers.vehicle_brand_code}
                />
                {answers.vehicle_brand_code && (
                  <>
                    {isLoadingVehicleModels ? (
                      <p className="text-center">Loading models...</p>
                    ) : (
                      <InputSelect
                        label="Modello"
                        name="vehicle_model_code"
                        id="template"
                        options={vehicleModels}
                        placeholder="Modello"
                        onChange={(value) =>
                          updateFormData({ vehicle_model_code: value })
                        }
                        value={answers.vehicle_model_code}
                      />
                    )}

                    {!isLoadingVehicleModels ? (
                      IsLoadingVehicleVersions ? (
                        <p className="text-center">Loading Versions...</p>
                      ) : (
                        answers.vehicle_model_code && (
                          <InputSelectTable
                            TableHeader={
                              <div className="d-flex">
                                <div className="col-4">Carburante</div>
                                <div className="col-1">CC</div>
                                <div className="col-3">Tipo</div>
                                <div className="col-4">Descrizione</div>
                              </div>
                            }
                            label="Versione"
                            name="vehicle_version_code"
                            id="vehicle_version_code"
                            options={vehicleVersions}
                            selected={answers.vehicle_version_code}
                            onSelectOption={(value) =>
                              updateFormData({ vehicle_version_code: value })
                            }
                          />
                        )
                      )
                    ) : (
                      ""
                    )}
                  </>
                )}
                {answers.vehicle_version_code && (
                  <>
                    <InputSelect
                      label="Data di prima immatricolazione"
                      name="imm_vehicle_month"
                      id="imm_vehicle_month"
                      placeholder="-Mese-"
                      options={months}
                      onChange={(value) =>
                        updateFormData({ imm_vehicle_month: value })
                      }
                      value={answers.imm_vehicle_month}
                    >
                      <InputSelect
                        name="imm_vehicle_year"
                        id="imm_vehicle_year"
                        placeholder="-Anno-"
                        options={years}
                        nostyle={1}
                        onChange={(value) =>
                          updateFormData({ imm_vehicle_year: value })
                        }
                        value={answers.imm_vehicle_year}
                      />
                    </InputSelect>
                    <InputSelect
                      label="Altro alimentatore"
                      name="other_power_supply"
                      id="other_power_supply"
                      placeholder="-Seleziona-"
                      options={formData.vehicle_fuels}
                      onChange={(value) => {
                        updateFormData({ other_power_supply: value });
                        // console.log(value);
                      }}
                      value={answers.other_power_supply}
                    />
                    <InputSelect
                      label="Parcheggio auto"
                      name="vehicle_parking"
                      id="vehicle_parking"
                      placeholder="-Seleziona-"
                      options={formData.parking_types}
                      onChange={(value) =>
                        updateFormData({ vehicle_parking: value })
                      }
                      value={answers.vehicle_parking}
                    />
                    <InputSelect
                      label="Antifurto"
                      name="theft_protection_code"
                      id="theft"
                      placeholder="-Seleziona-"
                      options={formData.theft_protections}
                      onChange={(value) =>
                        updateFormData({ theft_protection_code: value })
                      }
                      value={answers.theft_protection_code}
                    />
                    <InputSelect
                      label="Utilizzo"
                      name="vehicle_usage"
                      id="vehicle_usage"
                      placeholder="-Seleziona-"
                      options={formData.vehicle_usage_types}
                      onChange={(value) =>
                        updateFormData({ vehicle_usage: value })
                      }
                      value={answers.vehicle_usage}
                    />
                    <InputSelect
                      label="Km percorsi in un anno"
                      name="predicted_km"
                      id="predicted_km"
                      placeholder="-Seleziona-"
                      options={km_during_one_year}
                      onChange={(value) => {
                        updateFormData({ predicted_km: value });
                      }}
                      value={answers.predicted_km}
                    />
                    {answers.imm_vehicle_year !== "" && (
                      <InputSelect
                        label="Anno in cui hai comprato l'auto"
                        name="vehicle_purchased_year"
                        id="vehicle_purchased_year"
                        placeholder="-Seleziona-"
                        options={getAllowedPurchaseYears(
                          answers.imm_vehicle_year
                        )}
                        onChange={(value) => {
                          updateFormData({ vehicle_purchased_year: value });
                        }}
                        value={answers.vehicle_purchased_year}
                      />
                    )}
                    <InputSelect
                      label="Auto nel nucleo familiare"
                      name="vehicles_owned"
                      id="vehicles_owned"
                      placeholder="-Seleziona-"
                      options={vehiclesAmountInFamily}
                      onChange={(value) => {
                        updateFormData({ vehicles_owned: value });
                      }}
                      value={answers.vehicles_owned}
                    />
                    <InputRadio
                      title="Hai montato il gancio di traino?"
                      paragraph="(iscritta a rimorchiatori, caravan, ecc.)"
                      options={flagResponse}
                      name="tow_hook"
                      id="tow_hook"
                      onChange={(value) => updateFormData({ tow_hook: value })}
                      value={answers.tow_hook}
                    />
                    {answers.date_of_birth !== "" && (
                      <InputSelect
                        label="Anno patente"
                        name="driving_license_year"
                        id="driving_license_year"
                        placeholder="-Seleziona-"
                        options={getAllowedLicenseYears(answers.date_of_birth)}
                        onChange={(value) => {
                          updateFormData({ driving_license_year: value });
                        }}
                        value={answers.driving_license_year}
                      />
                    )}
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        )}
        {index === 3 && (
          <div className="form-group" id="index-3">
            <InputSelect
              label="Seleziona il tipo di assicurazione."
              name="insurance_type"
              id="insurance_type"
              placeholder="-Seleziona-"
              options={insuranceTypes}
              onChange={(value) => updateFormData({ insurance_type: value })}
              value={answers.insurance_type}
            />

            <InputDate
              minDate={getAllowedPolicyEffectDate("min")}
              maxDate={getAllowedPolicyEffectDate("max")}
              name="policy_effective_date"
              id="policy_effective_date"
              label="Data di inizio della copertura della polizza"
              paragraph="Date valide: da oggi a un anno da oggi"
              onChange={(value) =>
                updateFormData({ policy_effective_date: value })
              }
              value={answers.policy_effective_date}
            />
            <InputRadio
              title="Ci sono altri conducenti?"
              options={flagResponse}
              name="other_drivers"
              onChange={(value) => updateFormData({ other_drivers: value })}
              value={answers.other_drivers}
            />
            {answers.other_drivers ? (
              <InputText
                placeholder="(18 - 30)"
                type="number"
                min={18}
                max={30}
                label="Età del conducente più giovane"
                name="youngest_age_driver"
                id="eta"
                onChange={(value) =>
                  updateFormData({ youngest_age_driver: value })
                }
                value={answers.youngest_age_driver}
              />
            ) : null}
            <InputText
              placeholder="(18 - 30)"
              type="number"
              min={18}
              max={30}
              label="Età del membro più giovane della famiglia che vive con la patente di guida"
              name="youngest_age_family_member"
              id="eta"
              onChange={(value) =>
                updateFormData({ youngest_age_family_member: value })
              }
              value={answers.youngest_age_family_member}
            />
            {/* THIS STEPS NEED TO BE VALIDATED */}
            <InputSelect
              label="Prima assicurazione in 6 anni"
              name="first_insuranced_year"
              id="first_insuranced_year"
              placeholder="-Seleziona-"
              options={lastSixYears}
              onChange={(value) =>
                updateFormData({ first_insuranced_year: value })
              }
              value={answers.first_insuranced_year}
            />
            <InputRadio
              title="Hai fatto sinistri negli ultimi 6 anni?"
              name="violations"
              id="violations"
              placeholder="-Seleziona-"
              options={flagResponse}
              onChange={(value) => updateFormData({ violations: value })}
              value={answers.violations}
            />
            {answers.violations && answers.first_insuranced_year ? (
              <InputViolations
                firstRegistrationYear={answers.first_insuranced_year}
                title="Violations"
                onChange={(data) =>
                  updateFormData({
                    violations_data: data.details,
                    violations_number: data.number,
                  })
                }
                value={answers.violations_data}
              />
            ) : null}
            {/* END */}
            <InputSelect
              label="Classe di merito."
              name="merit_class"
              id="merit_class"
              placeholder="-Seleziona-"
              options={meritClass}
              onChange={(value) => updateFormData({ merit_class: value })}
              value={answers.merit_class}
            />
            <InputRadio
              title="Il conducente dichiara: di essere in possesso di patente italiana mai sospesa da 5 anni e con almeno 20 punti, di non aver mai ricevuto sanzioni per ubriachezza, di non aver modificato il veicolo."
              options={flagResponse}
              name="mofified_vehicle_and_valid_driving_license"
              id="mofified_vehicle_and_valid_driving_license"
              onChange={(value) =>
                updateFormData({
                  mofified_vehicle: value,
                  valid_driving_license: value,
                })
              }
              value={answers.mofified_vehicle}
            />
            {answers.gender === "G" && (
              <>
                <InputText
                  id="business_name"
                  name="business_name"
                  label="Ragione sociale"
                  onChange={(value) => updateFormData({ business_name: value })}
                  value={answers.business_name}
                />
                <InputText
                  validator={validateVatNumber}
                  id="vat_number"
                  name="vat_number"
                  label="Partita Iva"
                  onChange={(value) => updateFormData({ vat_number: value })}
                  value={answers.vat_number}
                />
                <InputSelect
                  label="Tipologia azienda"
                  name="company_type"
                  id="company_type"
                  placeholder="-Seleziona-"
                  options={companyTypes}
                  onChange={(value) => updateFormData({ company_type: value })}
                  value={answers.company_type}
                />
              </>
            )}
            <InputSelect
              label="Tippo guida"
              name="guide_type"
              id="guide_type"
              placeholder="-Seleziona-"
              options={guideType}
              onChange={(value) => updateFormData({ guide_type: value })}
              value={answers.guide_type}
            />
          </div>
        )}
        {index === 4 && (
          <div className="form-group" id="index-4">
            <InputText
              id="name"
              name="name"
              label="Nome del contraente"
              onChange={(value) => updateFormData({ name: value })}
              value={answers.name}
            />
            <InputText
              id="surname"
              name="surname"
              label="Cognome"
              onChange={(value) => updateFormData({ surname: value })}
              value={answers.surname}
            />

            {/* <InputText id="fiscal_code" name="fiscal_code" label="Codice Fiscale" onChange={(value)=>updateFormData({fiscal_code:value})} value={answers.fiscal_code}/> */}

            <InputText
              type="email"
              id="email"
              name="email"
              label="E-mail"
              onChange={(value) => updateFormData({ email: value })}
            />
            <InputText
              id="phone"
              name="phone"
              label="Phone"
              paragraph="Numeri di rete fissa non accettati dalle aziende"
              onChange={(value) => updateFormData({ phone: value })}
            />

            <h5 className="text-center">Informativa Privacy e IVASS</h5>

            <InputPrivacy
              label="Dichiaro di voler ricevere via email, ai sensi dell\'articolo 56 del Regolamento 40 IVASS del 02/08/2018, i preventivi personalizzati dalle compagnie assicurative partner di Comparasemplice Broker srl Il metodo sarà'
                            'modificabile una volta contattata l\'azienda prescelta. Dichiaro di aver preso visione delle note informative relative ai prodotti assicurativi qui raggiungibili. Dichiaro di aver letto e di accettare la pre-'
                            'informazioni contrattuali (pdf) ai sensi della normativa vigente ai sensi del D.Lgs. 209/2005. (obbligatorio)"
              name="declare"
              id="declare"
              checked={answers.declare}
              onChange={() => {
                let value = !answers.purposes;
                updateFormData(value, "declare");
              }}
            />
            <InputPrivacy
              label="Given the privacy policy , I acknowledge that the processing of my data is preliminary to the provision of the services described in articles 2.1 and 2.2 of paragraph 2 PURPOSE AND LEGAL BASIS OF THE PROCESSING (Article'
                            '6, paragraph 1, letters b) and c) of the Privacy Regulation). (obligatory)"
              name="privacy"
              id="privacy"
              checked={answers.privacy}
              onChange={() => {
                let value = !answers.purposes;
                updateFormData(value, "privacy");
              }}
            />
            <InputPrivacy
              label="Acconsento al trattamento dei miei dati personali per l'invio di comunicazioni promozionali e materiale pubblicitario, l'offerta di prodotti eo servizi propri o di terzi, il compimento di sondaggi e ricerche di mercato,
                                con qualsiasi mezzo compreso in particolare lutilizzo di telefono con operatore e/o sistemi automatizzati (es. SMS, MMS, fax, autorisponditori, notifiche push, social media). (opzionale)"
              name="personal"
              id="personal"
              checked={answers.personal}
              onChange={() => {
                let value = !answers.purposes;
                updateFormData(value, "personal");
              }}
            />
            <InputPrivacy
              label="Acconsento al trasferimento dei miei dati personali ad altre società con contratti di collaborazione commerciale, diverse dal titolare e dai contitolari del trattamento, per l invio di comunicazioni promozionali e,
                            materiale pubblicitario, offerte di prodotti e/o servizi propri o di terzi, compimento di sondaggi e ricerche di mercato, con qualsiasi mezzo compreso in particolare l utilizzo del telefono con operatore e/o di sistemi automatizzati
                            (es. SMS, MMS, fax, autorisponditori, notifiche push, social media). (opzionale)"
              name="transfer"
              checked={answers.transfer}
              onChange={() => {
                let value = !answers.purposes;
                updateFormData(value, "transfer");
              }}
            />
            <InputPrivacy
              label="Acconsento al trattamento dei miei dati personali per la profilazione per finalità commerciali e di marketing in base alle modalità di utilizzo del Sito, all interesse manifestato nei vari prodotti/servizi ed esposizione a
                            pubblicità nonché per l\'analisi dei dati personali dell\'utente, delle scelte di acquisto e delle scelte di acquisto e delle preferenze comportamentali sul Sito, al fine di strutturare al meglio comunicazioni e personalizzazioni
                            proposte commerciali, per effettuare analisi generali. (opzionale)"
              name="purposes"
              checked={answers.purposes}
              onChange={() => {
                let value = !answers.purposes;
                updateFormData(value, "purposes");
              }}
            />
          </div>
        )}
      </div>
      {index >= 1 && index <= 4 && (
        <div className="footer-buttons">
          <div className="d-flex justify-content-between">
            {index !== 1 && (
              <button
                className="btn btn-questionnaire back"
                onClick={prevButton}
              >
                Di Ritorno
              </button>
            )}
            <button className="btn btn-questionnaire" onClick={nextButton}>
              {index === 4 ? "Vai a preventi" : "Continua"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
