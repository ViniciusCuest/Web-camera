import { Box, ButtonFixedFooterLayout, ButtonPrimary, IconPhotoCameraRegular, IntegerField, ResponsiveLayout, Text4 } from "@telefonica/mistica";
import { useSelector } from "react-redux";
//import { RootState } from '../index'
import { useNavigate } from "react-router-dom";
export default function Home() {
    const navigate = useNavigate();
    const iccid = useSelector((store) => store.barcode.barcodeValue);
    alert(iccid);
    return (
        <ButtonFixedFooterLayout
            button={<ButtonPrimary EndIcon={IconPhotoCameraRegular} onPress={() => {
                navigate('/barcode');
            }}>
                Acessar leitor
            </ButtonPrimary>}
        >
            <Box paddingTop={80} paddingX={16}>
                <ResponsiveLayout fullWidth>
                    <Box paddingY={80}>
                        <IntegerField
                            label={'ICCID'}
                            data-cy={'barcode-input'}
                            defaultValue={undefined}
                            maxLength={20}
                            value={iccid}
                            helperText={'Iccid após leitura'}
                            name={""}
                            readOnly
                        />
                    </Box>
                </ResponsiveLayout>
            </Box>
        </ButtonFixedFooterLayout>
    );
}

function RootState(state: unknown): unknown {
    throw new Error("Function not implemented.");
}
