import React from 'react'
import { View, Dimensions } from 'react-native'
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

export default function Shimmer() {
    return (
        <>
          <View style={{ padding: 15, backgroundColor: "#fff", flex: 1 }}>
            <ShimmerPlaceHolder
              style={{ paddingBottom: 5 }}
              autoRun={true}
              width={Dimensions.get("window").width - 130}
              height={30}
            />

            <ShimmerPlaceHolder
              autoRun={true}
              height={70}
              width={Dimensions.get("window").width - 25}
              style={{ paddingBottom: 25 }}
            />
            <ShimmerPlaceHolder
              style={{ paddingBottom: 5 }}
              autoRun={true}
              width={Dimensions.get("window").width - 130}
              height={30}
            />
            <ShimmerPlaceHolder
              autoRun={true}
              height={35}
              width={Dimensions.get("window").width - 25}
              style={{ paddingBottom: 5 }}
            />
            <ShimmerPlaceHolder
              autoRun={true}
              height={35}
              width={Dimensions.get("window").width - 25}
              style={{ paddingBottom: 5 }}
            />
            <ShimmerPlaceHolder
              autoRun={true}
              height={50}
              width={Dimensions.get("window").width - 25}
              style={{ paddingBottom: 25 }}
            />
            <ShimmerPlaceHolder
              style={{ paddingBottom: 5 }}
              autoRun={true}
              width={Dimensions.get("window").width - 130}
              height={30}
            />

            <ShimmerPlaceHolder
              autoRun={true}
              height={55}
              width={Dimensions.get("window").width - 25}
              style={{ paddingBottom: 25 }}
            />
          </View>
          <View>
            <ShimmerPlaceHolder
              autoRun={true}
              height={70}
              width={Dimensions.get("window").width}
              style={{ paddingBottom: 15 }}
            />
            <ShimmerPlaceHolder
              autoRun={true}
              height={55}
              width={Dimensions.get("window").width}
            />
          </View>
        </>
    )
}
