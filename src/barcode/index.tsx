import React from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Box, ButtonFixedFooterLayout, ButtonSecondary, Spinner, Text4, skinVars } from '@telefonica/mistica';
import styles from '../styles.module.css';
import { useDispatch } from 'react-redux';
import { scannedBarcode } from '../index';
import { useNavigate } from 'react-router-dom';

export default function Barcode() {
  const [isLoading, setIsLoading] = React.useState(true);
  const width = global.window.innerWidth;
  const height = global.window.innerHeight;

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const aspectRatio = width / height;

  const onNewScanResult = React.useCallback(
    (decodedText: string) => {
      scannedBarcode(decodedText);
      navigate('/');
    },
    [dispatch],
  );

  const handleStartScanning = async (html5QrCode: Html5Qrcode) => {
    const isIphone = navigator.userAgent.match(/iphone/gi);
    let cameraId: string | null;
    let config = {
      fps: 10,
    };

    const deviceCameras = await Html5Qrcode.getCameras();
    cameraId = deviceCameras.filter(item => item.label.match(/back/gi))[0]?.id ?? ''

    isIphone ? config = {
      ...config,
      videoConstraints: {
        aspectRatio,
        facingMode: 'environment',
        zoom: 4,
      },
    } : config = {
      ...config,
      aspectRatio,
      videoConstraints: {
        facingMode: 'environment',
        autoGainControl: false,
        focusMode: 'continuous',
        zoom: 2,
      },
    };

    try {
      await html5QrCode.start(cameraId, config, onNewScanResult, (err) => {
        console.error(err);
        return;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const html5QrCode = new Html5Qrcode('video-area', {
      useBarCodeDetectorIfSupported: true,
      verbose: false,
      formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
    });
    handleStartScanning(html5QrCode);
    return () => {
      html5QrCode.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ButtonFixedFooterLayout
      isFooterVisible
      containerBgColor={'#000000'}
      footerBgColor={'#000000'}
      button={
        <ButtonSecondary
          onPress={() => {
            //back();
          }}
          style={{
            background:
              skinVars.colors.buttonSecondaryBorderInverse,
          }}
        >
          Digitar manualmente
        </ButtonSecondary>
      }
    >
      <Box className={styles.overlay}>
        <Box className={styles.header}>
          <Box className={styles.info_header}>
            <Text4
              textAlign="center"
              as={'h2'}
              medium
              color={skinVars.colors.textPrimaryInverse}
            >
              Posicione o código de barras na linha
            </Text4>
            <Text4
              textAlign="center"
              as={'h2'}
              medium
              color={skinVars.colors.textPrimaryInverse}
            >
              e aguarde a leitura automática
            </Text4>
          </Box>
        </Box>
        <Box className={styles.scanning_area}>
          {
            isLoading ?
              <div className={styles.centralize}>
                <Spinner size={35} color={skinVars.colors.textPrimaryInverse} />
              </div>
              :
              <hr
                className={styles.divider}
                style={{
                  backgroundColor: `${skinVars.colors.buttonPrimaryBackground}`,
                  borderColor: `${skinVars.colors.buttonPrimaryBackground}`,
                }} />
          }
          <div
            id="video-area"
            data-testid="video"
            className={styles.videos}
          />

        </Box>
      </Box>
    </ButtonFixedFooterLayout>
  );

}
