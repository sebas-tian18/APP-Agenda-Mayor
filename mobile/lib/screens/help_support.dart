// Home_Screen
import 'package:flutter/material.dart';
import 'package:mobile/widgets/custom_app_bar.dart';

class HelpSupportScreen extends StatelessWidget {
  final bool fromNavigationMenu;

  HelpSupportScreen({super.key, this.fromNavigationMenu = true});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'acerca de',
        showBackButton: fromNavigationMenu,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Text(
            "Lorem ipsum dolor sit amet. Eum iusto placeat ab pariatur inventore eos illo aliquam et atque optio ut voluptatem blanditiis non nesciunt excepturi ad nemo sequi. Qui voluptatibus velit ut temporibus nisi in possimus voluptatibus. Ab nulla nihil aut deleniti voluptas et repudiandae aliquam?\n\n"
            "Ut placeat voluptatem id galisum amet ex repellendus dignissimos. Qui amet delectus et molestiae saepe aut molestiae molestiae rem voluptas excepturi. Et galisum sint hic eveniet nisi et autem magnam ex magni delectus id laborum quas qui quod temporibus id maxime praesentium. Et nisi iure aut Quis officiis qui odio soluta et odio nihil sit repudiandae consequatur.\n\n"
            "Ad expedita commodi aut perspiciatis tempore vel neque harum rem voluptas esse qui eius internos eum laudantium obcaecati! Cum voluptate aspernatur non veniam ipsum ad quibusdam unde cum quia consequatur sit iusto placeat qui perspiciatis enim et earum quos. Et laudantium dolorem qui repellendus quam et delectus consequatur est dicta nesciunt eum incidunt iure.",
            style: TextStyle(fontSize: 16.0),
            textAlign: TextAlign.justify,
          ),
        ),
      ),
    );
  }
}
