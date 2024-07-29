export const handleLabelName = (storeConfigurations, genericName) => {
  const matchingConfig = storeConfigurations.find(
    (config) => config.genericFiledName == genericName
  );
  if (matchingConfig) {
    const specificFieldName = matchingConfig.specificFieldName;
    return specificFieldName;
  } else {
    return genericName;
  }
};

export const COMPANY_CODE = "Company Code";
