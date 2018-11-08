function mySettings(props) {
	return (
		<Page>
			<Section title={<Text bold>Cloudinary Settings</Text>}>

				<TextInput
					label="Cloud Name"
					title="Cloud Name"
					settingsKey="cloud"
				/>

				<TextInput
					label="API Key"
					title="API Key"
					settingsKey="apikey"
				/>

				<TextInput
					label="Secret"
					title="Secret"
					settingsKey="secret"
				/>

				<Text>Use the link below to check your Cloud's settings: </Text>
				<Link source="https://cloudinary.com/console/dashboard">Cloudinary's Dashboard</Link>
			</Section>

			{/*<Section*/}
				{/*title={<Text bold>App Settings</Text>}>*/}
				{/*<Toggle*/}
					{/*settingsKey="toggle"*/}
					{/*label="Toggle Switch"*/}
				{/*/>*/}
				{/*<ColorSelect*/}
					{/*settingsKey="color"*/}
					{/*colors={[*/}
						{/*{color: "tomato"},*/}
						{/*{color: "sandybrown"},*/}
						{/*{color: "#FFD700"},*/}
						{/*{color: "#ADFF2F"},*/}
						{/*{color: "deepskyblue"},*/}
						{/*{color: "plum"}*/}
					{/*]}*/}
				{/*/>*/}
			{/*</Section>*/}
		</Page>
	);
}

registerSettingsPage(mySettings);
