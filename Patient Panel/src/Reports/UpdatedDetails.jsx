import React, { useEffect, useState } from 'react';
import { View,Platform,StatusBar, Text, StyleSheet, TouchableOpacity,ActivityIndicator, Dimensions,ScrollView, Alert,Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { backendURL } from "../backendapi";
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
function UpdatedDetails({ patientId }) {
  const route = useRoute();
  const navigation = useNavigation();
  const [visitDetails, setVisitDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coordinator, setCoordinator] = useState(null);
  const visitId = route.params?.visitId;
 
  useEffect(() => {
    const fetchCoordinatorName = async () => {
      try {
        const patientId = await AsyncStorage.getItem('patientId');
        if (!patientId) {
          console.error('No patient ID found in async storage');
          return;
        }
        const response = await fetch(`${backendURL}/patientRouter/PatientCoordinator/${patientId}`);
        const data = await response.json();

        if (data && data.length > 0) {
          setCoordinator(data[0].coordinator);
        } else {
          console.error('No data found for the specified patient ID');
        }
      } catch (error) {
        console.error('Error fetching coordinator name:', error);
      }
    };

    fetchCoordinatorName();
  }, []);
  const handleBack = () => {
    navigation.goBack();
};
const handleDischargeCertificatePress = (url) => {
  Linking.openURL(`${backendURL}/getfile/${url}`);
};

  useEffect(() => {
    if (!visitId) {
      setError('Invalid visit ID');
      setLoading(false);
      Alert.alert(
        'Error',
        'No visit ID provided. Please try again.',
        [
          { text: 'Go Back', onPress: () => navigation.goBack() }
        ]
      );
      return;
    }

    const fetchVisitDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${backendURL}/patientRouter/OneAppointmentDetails/${visitId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.visitDetails) {
          throw new Error('No visit details found');
        }
        
        setVisitDetails(data.visitDetails);
      } catch (error) {
        console.error("Error fetching visit details:", error);
        setError(error.message || 'Failed to fetch visit details');
        Alert.alert(
          'Error',
          'Failed to load visit details. Please try again later.',
          [
            { text: 'Retry', onPress: () => fetchVisitDetails() },
            { text: 'Go Back', onPress: () => navigation.goBack() }
          ]
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVisitDetails();
  }, [visitId, navigation]);

  const renderProblemForConsultation = () => {
    const {problemForConsultation } = visitDetails;
    if (!problemForConsultation) return null;
    return (
      <View style={styles.exiDisContainer}>
      {problemForConsultation && (
        <View>
           <Text style={styles.texthead2}>Problem For Consultation</Text>
      </View>
       )}
        {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.sob && problemForConsultation.sob.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: SOB{"\n"}
           Duration:  {problemForConsultation.sob.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.sob.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.sob.statusOfDisease}
           </Text>
          )}
      </View>
       )}
       {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.cough && problemForConsultation.cough.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Cough{"\n"}
           Duration:  {problemForConsultation.cough.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.cough.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.cough.statusOfDisease}
           </Text>
          )}
      </View>
       )}
         {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.bleedingwithcough && problemForConsultation.bleedingwithcough.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Bleeding With Cough{"\n"}
           Duration:  {problemForConsultation.bleedingwithcough.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.bleedingwithcough.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.bleedingwithcough.statusOfDisease}
           </Text>
          )}
      </View>
       )}
        {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.chestpain && problemForConsultation.chestpain.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Chest Pain{"\n"}
           Duration:  {problemForConsultation.chestpain.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.chestpain.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.chestpain.statusOfDisease}
           </Text>
          )}
      </View>
       )}
      {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.wheeze && problemForConsultation.wheeze.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Wheeze{"\n"}
           Duration:  {problemForConsultation.wheeze.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.wheeze.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.wheeze.statusOfDisease}
           </Text>
          )}
      </View>
       )}
       {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.phlagm && problemForConsultation.phlagm.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Phlagm{"\n"}
           Duration:  {problemForConsultation.phlagm.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.phlagm.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.phlagm.statusOfDisease}
           </Text>
          )}
      </View>
       )}
        {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.nasalcongestion && problemForConsultation.nasalcongestion.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Nasal Congestion{"\n"}
           Duration:  {problemForConsultation.nasalcongestion.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.nasalcongestion.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.nasalcongestion.statusOfDisease}
           </Text>
          )}
      </View>
       )}
      {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.snoring && problemForConsultation.snoring.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Snoring{"\n"}
           Duration:  {problemForConsultation.snoring.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.snoring.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.snoring.statusOfDisease}
           </Text>
          )}
      </View>
       )}
        {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.daytimesleepiness && problemForConsultation.daytimesleepiness.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Day Time Sleepiness{"\n"}
           Duration:  {problemForConsultation.daytimesleepiness.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.daytimesleepiness.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.daytimesleepiness.statusOfDisease}
           </Text>
          )}
      </View>
       )}
       {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.weakness && problemForConsultation.weakness.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease: Weakness{"\n"}
           Duration:  {problemForConsultation.weakness.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.weakness.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.weakness.statusOfDisease}
           </Text>
          )}
      </View>
       )}
        {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.lethargy && problemForConsultation.lethargy.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease:  Lethargy{"\n"}
           Duration:  {problemForConsultation.lethargy.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.lethargy.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.lethargy.statusOfDisease}
           </Text>
          )}
      </View>
       )}
      {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.lowmood && problemForConsultation.lowmood.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease:  Low mood{"\n"}
           Duration:  {problemForConsultation.lowmood.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.lowmood.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.lowmood.statusOfDisease}
           </Text>
          )}
      </View>
       )}
       {problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.diarrhoea && problemForConsultation.diarrhoea.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease:  Diarrhoea{"\n"}
           Duration:  {problemForConsultation.diarrhoea.duration.numericValue} 
           {' '}  Unit:  {problemForConsultation.diarrhoea.duration.unit}{"\n"}
           Status of Disease:  {problemForConsultation.diarrhoea.statusOfDisease}
           </Text>
          )}
      </View>
       )}
    {problemForConsultation && problemForConsultation.uncontrolleddisease.length > 0 && (
 <View style={styles.backField}>
  {problemForConsultation.uncontrolleddisease.map((disease, index) => (
    <View key={index}>
      <Text style={styles.subHead4}>
        Uncontrolled Disease: {disease.name === "Others" ? disease.disease : disease.name}{"\n"}
        Duration: {disease.duration.numericValue} {' '} Unit: {disease.duration.unit}{"\n"}
        Status of Disease: {disease.statusOfDisease}
      </Text>
    </View>
  ))}
</View>
)}
{problemForConsultation && (
        <View  style={styles.backField}>
           {problemForConsultation.others && problemForConsultation.others.duration.numericValue !== 0 && (
            <Text style={styles.subHead4}>Disease:  Others{"\n"}
           Details:   {problemForConsultation.others.disease}
           {' '}  Duration:  {problemForConsultation.others.duration.numericValue}{"\n"}
           Unit:  {problemForConsultation.others.duration.unit}
           {' '}  Status of Disease:  {problemForConsultation.others.statusOfDisease}
           </Text>
          )}
      </View>
       )}
   </View>
    );
  };

  const renderImportantHistory = () => {
    const { importantHistory } = visitDetails;
    if (!importantHistory) return null;

    return (
      <>
        <View style={styles.imphisContainer}>
      {importantHistory && (
        <View>
           <Text style={styles.texthead2}>Important History</Text>
      </View>
       )}
      {importantHistory && (
        <View  style={styles.backField}>
          {importantHistory.allergy && importantHistory.allergy.typeOfAllergy !== "NA" && (
            <Text style={styles.subHead}>Allergy: {importantHistory.allergy.typeOfAllergy}
           {' '}  Duration:  {importantHistory.allergy.duration.numericValue} 
           {' '}  Unit:  {importantHistory.allergy.duration.unit}</Text>
          )}
          {importantHistory.drugReaction && importantHistory.drugReaction.typeOfDrug !== "NA" && (
            <Text style={styles.subHead2}>Drug Type: {importantHistory.drugReaction.typeOfDrug}
            {' '}  Drug Reaction: {importantHistory.drugReaction.typeOfReaction}  
            </Text>
          )}
          {importantHistory.pastSurgery.typeOfSurgery !== "NA" && (
            <Text style={styles.subHead3}>Past Surgery: {importantHistory.pastSurgery.typeOfSurgery}
            {'\n'}Year Of Surgery:  {importantHistory.pastSurgery.year}  </Text>
         )}
           {importantHistory.pastDisease.typeOfDisease !== "NA" && (
            <Text style={styles.subHead2}>Past Disease: {importantHistory.pastDisease.typeOfDisease}
             </Text>
         )}
           {importantHistory.familyHistory !== "NA" && (
            <Text style={styles.subHead2}>Family History: {importantHistory.familyHistory}
             </Text>
         )}
         {importantHistory.occupation !== "NA" && (
            <Text style={styles.subHead2}>Occupation: {importantHistory.occupation}
             </Text>
         )}
           {importantHistory.exposure.dust.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure: Dust{"\n"}
              Duration:  {importantHistory.exposure.dust.duration.numericValue}
              {' '} Unit:  {importantHistory.exposure.dust.duration.unit}  
             </Text>
         )}
          {importantHistory.pastSurgery && importantHistory.exposure.cottondust.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Cotton Dust{"\n"}
              Duration:  {importantHistory.exposure.cottondust.duration.numericValue}
              {' '}  Unit:  {importantHistory.exposure.cottondust.duration.unit}  
             </Text>
         )}
          {importantHistory.exposure.wooddust.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Wood Dust{"\n"}
             Duration:  {importantHistory.exposure.wooddust.duration.numericValue}
              {' '}  Unit:  {importantHistory.exposure.wooddust.duration.unit}  
             </Text>
         )}
          {importantHistory.exposure.pigeon.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Pigeon{"\n"}
             Duration:  {importantHistory.exposure.pigeon.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.pigeon.duration.unit}  
             </Text>
         )}
           {importantHistory.exposure.hay.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Hay{"\n"}
             Duration:  {importantHistory.exposure.hay.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.hay.duration.unit}  
             </Text>
         )}
         {importantHistory.exposure.moulds.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Moulds{"\n"}
            Duration:   {importantHistory.exposure.moulds.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.moulds.duration.unit}  
             </Text>
         )}
          {importantHistory.pastSurgery && importantHistory.exposure.pollen.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Pollen{"\n"} 
            Duration:   {importantHistory.exposure.pollen.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.pollen.duration.unit}  
             </Text>
         )}
          {importantHistory.exposure.chemical.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Chemical{"\n"}
             Duration:   {importantHistory.exposure.chemical.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.chemical.duration.unit}  
             </Text>
          
         )}
          {importantHistory.exposure.stonedust.duration.numericValue !== 0 && (
            <Text style={styles.subHead3}>Exposure:  Stone Dust{"\n"}
             Duration :   {importantHistory.exposure.stonedust.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.stonedust.duration.unit}  
             </Text>
          
         )}
         {importantHistory.exposure.others.typeOfExposure !== "NA" && (
            <Text style={styles.subHead3}>Exposure:  {importantHistory.exposure.others.typeOfExposure}{"\n"}
            Duration:  {importantHistory.exposure.others.duration.numericValue}
            {' '}  Unit :  {importantHistory.exposure.chemical.duration.unit}  
             </Text>
         )}
        </View>
      )}
       </View>
      </>
    );
  };

  const renderExistingDiseases = () => {
    const { existingDeseases } = visitDetails;
    if (!existingDeseases) return null;
    return (
      <View style={styles.exiDisContainer}>
       {existingDeseases && (
          <View>
             <Text style={styles.texthead2}>Existing Diseases</Text>
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.diabetes && existingDeseases.diabetes.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Diabetes {"\n"}
             Duration:  {existingDeseases.diabetes.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.diabetes.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.diabetes.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hypertension && existingDeseases.hypertension.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Hypertension {"\n"}
             Duration:  {existingDeseases.hypertension.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hypertension.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hypertension.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ihd && existingDeseases.ihd.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  IHD {"\n"}
             Duration:  {existingDeseases.ihd.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ihd.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ihd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hypothyroidism && existingDeseases.hypothyroidism.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Hypothyroidism {"\n"}
             Duration:  {existingDeseases.hypothyroidism.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hypothyroidism.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hypothyroidism.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.allergicrhinitis && existingDeseases.allergicrhinitis.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Allergic Rhinitis{"\n"}
             Duration:  {existingDeseases.allergicrhinitis.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.allergicrhinitis.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.allergicrhinitis.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hyperuricemia && existingDeseases.hyperuricemia.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Allergic Rhinitis{"\n"}
             Duration:  {existingDeseases.hyperuricemia.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hyperuricemia.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hyperuricemia.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.asthama && existingDeseases.asthama.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Asthama{"\n"}
             Duration:  {existingDeseases.asthama.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.asthama.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.asthama.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.tb && existingDeseases.tb.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  TB{"\n"}
             Duration:  {existingDeseases.tb.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.tb.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.tb.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.copd && existingDeseases.copd.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  COPD{"\n"}
             Duration:  {existingDeseases.copd.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.copd.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.copd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ild && existingDeseases.ild.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  ILD{"\n"}
             Duration:  {existingDeseases.ild.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ild.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ild.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ibs && existingDeseases.ibs.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  IBS{"\n"}
             Duration:  {existingDeseases.ibs.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ibs.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ibs.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.inflammatoryboweldisease && existingDeseases.inflammatoryboweldisease.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Inflammatory Bowel Disease{"\n"}
             Duration:  {existingDeseases.inflammatoryboweldisease.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.inflammatoryboweldisease.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.inflammatoryboweldisease.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.depression && existingDeseases.depression.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Depression{"\n"}
             Duration:  {existingDeseases.depression.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.depression.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.depression.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.anxiety && existingDeseases.anxiety.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Anxiety{"\n"}
             Duration:  {existingDeseases.anxiety.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.anxiety.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.anxiety.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.osa && existingDeseases.osa.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  OSA{"\n"}
             Duration:  {existingDeseases.osa.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.osa.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.osa.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.collagenvasculardisease && existingDeseases.collagenvasculardisease.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Collagen Vascular Disease{"\n"}
             Duration:  {existingDeseases.collagenvasculardisease.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.collagenvasculardisease.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.collagenvasculardisease.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.malignancy && existingDeseases.malignancy.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Malignancy{"\n"}
             Organ:   {existingDeseases.malignancy.organ}
             {' '} Duration:  {existingDeseases.malignancy.duration.numericValue}{"\n"} 
              Unit:  {existingDeseases.malignancy.duration.unit} {' '} 
             Status of Disease:  {existingDeseases.malignancy.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.dyslipidemia && existingDeseases.dyslipidemia.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Dyslipidemia{"\n"}
             Duration:  {existingDeseases.dyslipidemia.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.dyslipidemia.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.dyslipidemia.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.cld && existingDeseases.cld.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  CLD{"\n"}
             Duration:  {existingDeseases.cld.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.cld.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.cld.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ckd && existingDeseases.ckd.duration.numericValue !== 0 && (
              <Text style={styles.subHead5}>Disease:  CKD {"\n"}
             Type of CKD:   {existingDeseases.ckd.typeofckd} {"\n"}
            Duration:  {existingDeseases.ckd.duration.numericValue}  {' '}  
             Unit:  {existingDeseases.ckd.duration.unit} {"\n"}
            Status of Disease:  {existingDeseases.ckd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.others && existingDeseases.others.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Others{"\n"}
             Details:   {existingDeseases.others.disease}
             {' '}  Duration:  {existingDeseases.others.duration.numericValue}{"\n"}
             Unit:  {existingDeseases.others.duration.unit}
             {' '}  Status of Disease:  {existingDeseases.others.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         </View>
    );
  };

  const renderPastHospitalizations = () => {
    const { pastHospitalization } = visitDetails;
    if (!pastHospitalization?.length) return null;

    return (
      <>
       <View style={styles.exiDisContainer}>
        {pastHospitalization && pastHospitalization.length > 0 && (
          <Text style={styles.texthead2}>Past Hospitalization</Text>
        )}
        {pastHospitalization && pastHospitalization.length > 0 && (
          <View style={styles.backField}>
            {pastHospitalization.map((hospitalization, index) => (
              <View key={index} style={styles.hospitalizationItem}>
                <Text style={styles.subHead5}>
                  Year of Hospitalization: {hospitalization.yearOfHospitalization}{'\n'}
                  Hospitalized for : {hospitalization.days}  Days{'\n'}
                  Reason: {hospitalization.reason}{'\n'}
                  Discharge Certificate:{'       '}
                  {hospitalization.dischargeCertificate === 'NA' ? (
              <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
            ) : (
              <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.dischargeCertificate)}>
                <Text style={{ backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
              </TouchableOpacity>
            )}
                </Text>
              </View>
            ))}
          </View>
        )}
        </View>
      </>
    );
  };
  const renderPrescription = () => {
    const { prescription } = visitDetails;
    if (!prescription?.length) return null;
  
    return (
      <>
      <View style={styles.exiDisContainer}>
        {  prescription &&   prescription.length > 0 && (
          <Text style={styles.texthead2}>Prescription</Text>
        )}
        {  prescription &&   prescription.length > 0 && (
          <View style={styles.backField}>
            {  prescription.map((hospitalization, index) => (
              <View key={index} style={styles.hospitalizationItem}>
              
                  {hospitalization. prescriptiondocument === 'NA' ? (
              <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
            ) : (
              <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.prescriptiondocument)}>
                <Text style={{marginLeft: windowWidth*0.05,width:windowWidth*0.2, backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
              </TouchableOpacity>
            )}
                
              </View>
            ))}
          </View>
        )}
   </View>
</>
    );
  };
  const renderOtherDocuments = () => {
    const { otherdocuments} = visitDetails;
    if (!otherdocuments?.length) return null;
    return (
      <>
      <View style={styles.exiDisContainer}>
      {  otherdocuments &&   otherdocuments.length > 0 && (
        <Text style={styles.texthead2}>Other Docmunets</Text>
      )}
      {  otherdocuments &&   otherdocuments.length > 0 && (
        <View style={styles.backField}>
          {  otherdocuments.map((hospitalization, index) => (
            <View key={index} style={styles.hospitalizationItem}>
            <Text style={styles.subHead5}>
           Document Name: {hospitalization.documentname}{'\n'}
                {hospitalization.document === 'NA' ? (
            <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
          ) : (
            <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.document)}>
              <Text style={{marginTop: windowWidth*0.03, marginLeft: windowWidth*0.05,width:windowWidth*0.2, backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
            </TouchableOpacity>
          )}
              </Text>
            </View>
          ))}
        </View>
      )}
 </View>
 </>
  );
};
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!visitDetails) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDetails}>No visit details available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.visitContainer}>
       <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
         <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton13}>
                    <Text><Icon name="angle-left" size={25} color={Color.colorWhite} /></Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Visit Details</Text>
            </View>
      {/* <Text style={styles.texthead}>Visit Details</Text> */}

      <View style={styles.backField2}>
        <Text style={styles.subHead6}>
          Visit Date: {visitDetails.visitDate || 'Not specified'}
        </Text>
        <Text style={styles.subHead6}>
          Visit Time: {visitDetails.visitTime || 'Not specified'}
        </Text>
        <Text style={styles.subHead6}>
          Status of Sickness: {visitDetails.statusOfSickness || 'Not specified'}
        </Text>
        <Text style={styles.subHead6}>
          CAT Score: {visitDetails.catScore || 'Not specified'}
        </Text>
        <Text style={styles.subHead6}>
          Coordinator: {coordinator || 'Not specified'}
        </Text>
      </View>

      
      {renderExistingDiseases()}
      {renderImportantHistory()}
      {renderPastHospitalizations()}
      {renderProblemForConsultation()}
      {renderPrescription()}
      {renderOtherDocuments()}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  visitContainer: {
    overflow: 'hidden',
    backgroundColor:'#FFFFFF'
  },
  visitHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  visitHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton13: {
    marginLeft: windowWidth*0.03,
    marginRight:windowWidth*0.15,
},
  header: {
    padding: Platform.OS === 'ios' ? 16 : 12,
    backgroundColor: '#3982BD',
    flexDirection:'row',
    elevation: Platform.OS === 'android' ? 4 : 0,
    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
    shadowOpacity: Platform.OS === 'ios' ? 0.25 : undefined,
    shadowRadius: Platform.OS === 'ios' ? 3.84 : undefined,
},
headerTitle: {
    fontSize: Platform.OS === 'ios' ? 20 : 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
},
  visitDetails: {
    padding: windowWidth * 0.01,
  },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin:20,
    },
    hospitalizationItem: {
      marginBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    profileContainer: {
        marginLeft: windowWidth*0.01,
        marginTop: windowWidth*0.05,
        marginRight: windowWidth*0.01,
    },
  backField: {
  marginLeft: windowWidth*0.04,
  marginRight: windowWidth*0.09,
      },
      backField2: {
        marginLeft: windowWidth*0.05,
        marginRight: windowWidth*0.08,
        marginTop:windowWidth*0.05,
            },
      backField3: {
        marginLeft: windowWidth*0.01,
        marginRight: windowWidth*0.04,
      },
texthead: {
  marginTop:windowWidth*0.05,
    marginLeft: windowWidth*0.03,
    fontWeight: "600",
    fontFamily: 'extrabold01',
    fontSize: 17,
},
texthead2: {
  marginLeft: windowWidth*0.01,
  fontWeight: "600",
  fontFamily: 'extrabold01',
  fontSize: 17,
  marginTop: windowWidth*0.02,
  marginBottom: windowWidth*0.02,
},
exiDisContainer:{
marginBottom:windowWidth*0.01,
},
texthead3: {
  marginLeft: windowWidth*0.03,
  fontWeight: "600",
  fontFamily: 'extrabold01',
  fontSize: 14,
  marginTop: windowWidth*0.01,
},
subHead:{
    width: "100%",
    marginTop: windowWidth * 0.01,
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#C0E8FF",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,   
    paddingBottom: windowWidth * 0.02, 
},
subHead2:{
    marginTop: windowWidth*0.01,
    width:"100%",
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#D6E6F7",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,  
    paddingBottom: windowWidth * 0.02, 
},
subHead3:{
    marginTop: windowWidth*0.01,
    width: "100%",
    backgroundColor: "#e3e3e3",
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#D6E6F7",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    paddingBottom: windowWidth * 0.01,
    fontSize: 15,   
},
subHead4:{
  marginTop: windowWidth*0.01,
  width: "100%",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: "#D6E6F7",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'bold02',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,  
  paddingBottom: windowWidth * 0.02,  
},
subHead5:{
  marginTop: windowWidth*0.01,
  width: "100%",
  backgroundColor: "#e3e3e3",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: "#D6E6F7",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'bold02',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.02,
  fontSize: 15,   
},
subHead6:{
  marginTop: windowWidth*0.01,
  width: "100%",
  marginLeft: windowWidth*0.01,
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  // borderWidth: 1,
  // borderColor: '#000000',
  // backgroundColor: "#D9D9D9",
  backgroundColor: "#D6E6F7",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'regular89',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.02,
  fontSize: 15,   
},
visitContainer: {
  marginTop: windowWidth*0.05,
  padding: windowWidth*0.01,
  marginBottom:windowWidth*0.01,
  marginLeft:windowWidth*0.02

},
visitHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: windowWidth*0.2,
},
})
export default UpdatedDetails;